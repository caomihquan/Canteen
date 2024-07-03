import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryDialogComponent } from '../emp-subgroup/dialog/history-dialog/history-dialog.component';
import { FoodshiftAddnewDialogComponent } from '../emp-subgroup/dialog/foodshift-addnew-dialog/foodshift-addnew-dialog.component';
import { AddnewDialogComponent } from '../emp-subgroup/dialog/addnew-dialog/addnew-dialog.component';
import { FoodlineAddnewDialogComponent } from '../emp-subgroup/dialog/foodline-addnew-dialog/foodline-addnew-dialog.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';

@Component({
  selector: 'app-foodline',
  templateUrl: './foodline.component.html',
  styleUrls: ['./foodline.component.scss']
})
export class FoodlineComponent implements OnInit {

  @ViewChild('historydialog') historydialog: HistoryDialogComponent
  @ViewChild('addnewdialog') addnewdialog: AddnewDialogComponent
  @ViewChild('addnewfoodshiftdialog') addnewfoodshiftdialog: FoodshiftAddnewDialogComponent
  @ViewChild('addnewfoodlinedialog') addnewfoodlinedialog: FoodlineAddnewDialogComponent
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedItem:any;
  loginInfo: any = {};
  I18nLang:any


  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup = []



  selectedTab = 1
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
  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }




  AddMenu(){
        this.addnewfoodlinedialog.onOpenDialog();
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedItem = item;
  }

  onClickViewHistory(id:string){
        this.historydialog.onOpenDialog(id);
  }


  getListFoodLine(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:4,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      console.log(res);
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.totalItems

    })
  }

  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
    }
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
  PostMenu(){


  }

  selectFileImport(event:any){
    event.preventDefault();
    let files = event.target.files;
    if (files.length > 0) {
      let file = files[0]
      let reader = new FileReader();
      reader.onload = () => {
      if(reader.result){
        var array = new Uint8Array(reader.result  as ArrayBuffer);

        var _arrayBufferToBase64 = function (buffer: any) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        var _binaryData = _arrayBufferToBase64(array);
        var randomKey = "import_" + this.loginInfo['SessionID'] + "_" + Math.random().toString(36).replace(/[^a-z]+/g, '');
        // this.ImportFile({
        //       ImportKey: randomKey,
        //       FileName: file.name,
        //       FileSize: file.size,
        //       FileType: file.type,
        //       FileContent: _binaryData,
        //       TypeCode: "unionmembers"
        // })
      }
    }
    reader.readAsArrayBuffer(file);
    }
  }

  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  ClickTabFood(index:number){
    if(this.selectedTab == index) return;
    this.selectedTab = index;
  }


}
