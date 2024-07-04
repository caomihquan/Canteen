import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { enableRipple } from '@syncfusion/ej2-base';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';


enableRipple(true);

@Component({
  selector: 'app-food-shift',
  templateUrl: './food-shift.component.html',
  styleUrls: ['./food-shift.component.scss']
})
export class FoodShiftComponent implements OnInit {
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedItems:any;
  loginInfo: any = {};
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup = []

  tenNhom:string;
  moTa:string;
  donGia:string;

  constructor(
    private _ordinal:OrdinalService,
    private _languageService:LanguageService,
    private _translate:TranslateService,
    private _userService:AuthService,
    private _api:ApiHttpService
    ){
      _translate.use('vn');
      this.loginInfo = this._userService.getUser();
  }
  ngOnInit() {
    this.getListFoodLine();
  }


  getListFoodLine(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:3,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      console.log(res);
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.TotalItems

    })
  }

  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }



  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedItems = item;
  }


  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
    }
  }

  ResetModel(){
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }





}
