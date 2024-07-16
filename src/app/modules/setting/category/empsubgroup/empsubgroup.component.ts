import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-empsubgroup',
  templateUrl: './empsubgroup.component.html',
  styleUrls: ['./empsubgroup.component.scss']
})
export class EmpsubgroupComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd:AppDialogComponent
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  searchText:string;
  selectedGrid:any;
  loginInfo: any = {};

  ListPhanLoai:Array<any> = []
  selectPhanLoai:any;
  tennhom:string;
  moTa:string;
  donGia:string;

  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup:Array<any> = []

  I18Lang:any;
  NhomPhuCode:string;
  NhomPhuName:string
  DoiTuong:string
  HanMucNgay:string

  constructor(
    private _userService:AuthService,
    private _api:ApiHttpService,
    private _noti:NotificationService,
    protected _langSevice:LanguageService
    ){
      this.loginInfo = this._userService.getUser();
  }
  ngOnInit() {
    this.getListEmpSub();
  }


  getListEmpSub(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:1,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.searchText
    }).subscribe(res=>{
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.totalItems
    })
  }


  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedGrid = item;
    this.NhomPhuCode = item.NhomPhuCode
    this.NhomPhuName = item.NhomPhuName
    this.DoiTuong = item.DoiTuong
    this.HanMucNgay = item.HanMucNgay
  }

  onClickViewHistory(){
  }


  ClickPagerIndex(evt:any){
    this.PageIndex = evt;
    this.getListEmpSub();
  }

  ResetModel(){
    this.NhomPhuCode = '';
    this.NhomPhuName = ''
    this.DoiTuong = ''
    this.HanMucNgay = ''
  }

  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  submitDialog(evt:any){
    this._api.post(AppAPIConst.Cateogry.NhomPhu_spPostData,{
      NhomPhuCode:this.NhomPhuCode,
      NhomPhuName:this.NhomPhuName,
      DoiTuong:this.DoiTuong,
      HanMucNgay:this.HanMucNgay
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
        this.getListEmpSub()
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
        this._api.post(AppAPIConst.Cateogry.NhomPhu_spPostData,{
          strCode:this.selectedGrid?.NhomPhuCode,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.searchText = ''
            this.PageIndex = 0;
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
            this.getListEmpSub()
          }
        })
      }
    })

  }

  onSearch(){
    this.PageIndex = 0;
    this.ResetModel();
    this.getListEmpSub()
  }


}
