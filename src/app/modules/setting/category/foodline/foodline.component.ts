import { Component, OnInit, ViewChild } from '@angular/core';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';

@Component({
  selector: 'app-foodline',
  templateUrl: './foodline.component.html',
  styleUrls: ['./foodline.component.scss']
})
export class FoodlineComponent implements OnInit {
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
  getPhoto = fnCommon.ConvertPhotoEmpByUserID

  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup = []

  ListPhanLoai:Array<any> = []
  selectPhanLoai:any;
  ListLineType:Array<any> = []
  selectLineType:any;

  MaLine:string
  TenLine:string
  DonGia:string
  NgayHieuLuc = new Date().toISOString();
  NhaThau:string


  I18Lang:any;
  constructor(
    private _noti:NotificationService,
    private _languageService:LanguageService,
    private _userService:AuthService,
    private _api:ApiHttpService
    ){
      this.loginInfo = this._userService.getUser();
      this.I18Lang = this._languageService.I18LangService
  }
  ngOnInit() {
    this.getListFoodLine();
    this.getListPhanLoai();
  }

  getListPhanLoai(){
    this._api.post(AppAPIConst.Cateogry.Line_spGetDefault)
    .subscribe(res=>{
      if(res && res.Data){
        this.ListPhanLoai = res.Data.tblPhanLoaiLine;
        this.ListLineType = res.Data.tblLineType;
        console.log(this.ListPhanLoai);
        console.log(this.ListLineType);
      }
    })
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedGrid = item;
    this.MaLine = item.MaLine,
    this.TenLine = item.TenLine
    this.selectPhanLoai = this.ListPhanLoai.find(x => x.PhanLoaiLine == item.PhanLoaiLine)
    this.DonGia = item.DonGia
    this.NgayHieuLuc = item.NgayHieuLuc
    this.selectLineType =  this.ListLineType.find(x => x.LineType == item.LineType)
    this.NhaThau = item.NhaThau
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
      this.PageIndex = evt
      this.getListFoodLine();
  }

  ResetModel(){
    this.selectedGrid = null;
    this.MaLine = ''
    this.TenLine = ''
    this.selectPhanLoai = null
    this.DonGia = ''
    this.NgayHieuLuc = ''
    this.selectLineType = null
    this.NhaThau = ''
  }

  submitDialog(){
    this._api.post(AppAPIConst.Cateogry.NhomPhu_spPostData,{
      MaLine:this.MaLine,
      TenLine:this.TenLine,
      PhanLoaiLine:this.selectPhanLoai?.PhanLoaiLine,
      DonGia:this.DonGia,
      NgayHieuLuc:this.NgayHieuLuc,
      LineType:this.selectLineType?.LineType,
      NhaThau:this.NhaThau
    }).subscribe(res=>{
      if(res && res.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error.Message)
          return;
        }
        this.PageIndex = 0;
        this.dialogAdd.hide();
        this.ResetModel();
        this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
        this.getListFoodLine()
      }
    })
  }


  onAdd(){
    this.ResetModel();
    this.dialogAdd.show();
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
        this._api.post(AppAPIConst.Cateogry.Line_spdeleteData,{
          strCode:this.selectedGrid?.MaLine,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.PageIndex = 0;
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
            this.getListFoodLine()
          }
        })
      }
    })
  }



}
