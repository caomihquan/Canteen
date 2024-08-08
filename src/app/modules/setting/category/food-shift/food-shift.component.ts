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
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';


enableRipple(true);

@Component({
  selector: 'app-food-shift',
  templateUrl: './food-shift.component.html',
  styleUrls: ['./food-shift.component.scss']
})
export class FoodShiftComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd:AppDialogComponent
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedGrid:any;
  loginInfo: any = {};
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup = []


  I18Lang:any

  MaCa:string;
  TenCa:string;
  GhiChu:string;
  BatDau:string;
  KetThuc:string;

  constructor(
    private _ordinal:OrdinalService,
    private _languageService:LanguageService,
    private _userService:AuthService,
    private _api:ApiHttpService,
    protected _langS:LanguageService,
    private _noti:NotificationService
    ){
      this.loginInfo = this._userService.getUser();
      this.I18Lang = this._langS.I18LangService;
  }
  ngOnInit() {
    this.getListFoodShift();
  }


  getListFoodShift(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:3,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.searchText
    }).subscribe(res=>{
      console.log(res);
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.TotalItems

    })
  }





  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedGrid = item;
    this.MaCa = item.MaCa
    this.TenCa = item.TenCa
    this.GhiChu = item.GhiChu
    this.BatDau = item.ThoiGianBatDau
    this.KetThuc = item.ThoiGianKetThuc
  }


  ClickPagerIndex(evt:any){
    this.PageIndex = evt;
    this.getListFoodShift();
  }

  ResetModel(){
    this.MaCa = ''
    this.TenCa = ''
    this.GhiChu = ''
    this.BatDau = ''
    this.KetThuc = ''
  }

  onAdd(){
    this.ResetModel();
    this.dialogAdd.show();
  }
  onSubmit(){
    this._api.post(AppAPIConst.Cateogry.Ca_spPostData,{
      NhomPhuCode:this.MaCa,
      NhomPhuName:this.TenCa,
      DoiTuong:this.GhiChu,
      ThoiGianBatDau:this.BatDau,
      ThoiGianKetThuc:this.KetThuc,
    }).subscribe(res=>{
      if(res && res.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error.Message)
          return;
        }
        this.PageIndex = 0;
        this.searchText = ''

        this.dialogAdd.hide();
        this.ResetModel();
        this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
        this.getListFoodShift()
      }
    })
  }

  onEdit(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18Lang.Error.NoRowSelected)
      return;
    }
    this.dialogAdd.show();
  }

  onDelete(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18Lang.Error.NoRowSelected)
      return;
    }

    this._noti.Confirm({
      content:this.I18Lang.Common.WantToDelete,
      title:this.I18Lang.Common.Alert,
      OkFunction:()=>{
        this._api.post(AppAPIConst.Cateogry.Ca_spdeleteData,{
          strCode:this.selectedGrid?.MaCa,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.PageIndex = 0;
            this.searchText = ''
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
            this.getListFoodShift()
          }
        })
      }
    })


  }

  onSearch(){
    this.PageIndex = 0;
    this.ResetModel();
    this.getListFoodShift()
  }






}
