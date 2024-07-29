import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-cap-phat-the-khach',
  templateUrl: './cap-phat-the-khach.component.html',
  styleUrls: ['./cap-phat-the-khach.component.scss']
})
export class CapPhatTheKhachComponent implements OnInit {
  @ViewChild('dialogCapPhat') dialogCapPhat:AppDialogComponent
  @ViewChild('dialogTraThe') dialogTraThe:AppDialogComponent
  wrapSettings = { wrapMode: 'Content' };
  heightGrid = fnCommon.getGridHeight();
  listCapPhat:Array<any> = []
  I18nLang:any
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  TotalItems:number = 0
  SearchText:string;
  tblTheKhach:Array<any> = []
  selectedTheKhach:any;
  NguoiNhanThe:string;
  GhiChu:string;
  ThoiHanSuDungNgay = new Date().toISOString();
  HanMucNgay:string;
  selectedGrid:any
  getPhoto = fnCommon.ConvertPhotoEmpByUserID
  //trathe
  MaTheTra:any;
  NguoiTra:any;
  isNotTraThe:boolean = false;
  listHistory:Array<any> = []
  heightHistory:number = (window.innerHeight - 170)

  PageIndexHistory:number = AppCommon.PageIndex;
  PageSizeHistory:number = AppCommon.PageSize;
  TotalItemsHistory:number = 0


  constructor(
    private _noti:NotificationService,
    private _api:ApiHttpService,
    private _lang:LanguageService
  ){
    this.I18nLang = this._lang.I18LangService
  }

  ngOnInit(): void {
    this.getListCapPhat();
    this.getConfigDefault();
  }

  getConfigDefault(){
    this._api.post(AppAPIConst.TheKhach.capthekhach_spgetDefault).subscribe(res=>{
      this.tblTheKhach = res.Data.tblTheKhach
    })
  }
  onOpenCPHistory(item:any){
    this.selectedGrid = item;
    this.PageIndexHistory = 0;
    this.getLichSuThanhToan();
  }
  ClickPagerIndexHistory(evt:any){
    this.PageIndexHistory = evt;
    this.getLichSuThanhToan();
  }

  clickGrid(event:any){
    const item = event.rowData
    this.selectedGrid = item
    this.selectedTheKhach = this.tblTheKhach.find(x => x.MaTheKhach == item.MaTheKhach)
    this.NguoiNhanThe = item.HoTen
    this.GhiChu = item.GhiChu
    this.ThoiHanSuDungNgay = item.ThoiGianSuDung
    this.HanMucNgay = item.HanMucNgay
    this.isNotTraThe = !item.TraThe
    this.MaTheTra = item.MaTheKhach
    this.NguoiTra = item.HoTen
  }

  getListCapPhat(){
    this._api.post(AppAPIConst.TheKhach.capthekhach_spGetData,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.SearchText,
      MaTheKhach:null
    }).subscribe(res=>{
      if(res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }
        this.listCapPhat = res.Data.Data
        this.TotalItems = res.Data.OutputParams.TotalItems
      }
    })
  }


  submitDialog(){
    this._api.post(AppAPIConst.TheKhach.capthekhach_spPostData,{
      ID:this.selectedGrid?.ID ?? 0,
      MaTheKhach:this.selectedTheKhach?.MaTheKhach,
      HoTen:this.NguoiNhanThe,
      HanMucNgay:this.HanMucNgay,
      ThoiHanSuDung:this.ThoiHanSuDungNgay,
      GhiChu:this.GhiChu
    }).subscribe(res=>{
      if(res && res.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error.Message)
          return;
        }
        this.PageIndex = 0;
        this.SearchText = ''
        this.dialogCapPhat.hide();
        this.ResetModel();
        this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
        this.getListCapPhat()
      }
    })
  }

  onSearch(){
    this.PageIndex = 0;
    this.ResetModel();
    this.getListCapPhat()
  }

  clickPage(page:any){
    this.PageIndex = page;
    this.ResetModel();
    this.getListCapPhat()
  }

  ResetModel(){
    this.selectedTheKhach = null
    this.NguoiNhanThe = '';
    this.GhiChu = '';
    this.ThoiHanSuDungNgay = new Date().toISOString();
    this.isNotTraThe = false;
    this.MaTheTra = ''
    this.NguoiTra = ''
  }

  getLichSuThanhToan(){
    this._api.post(AppAPIConst.TheKhach.thekhach_spLichSuThanhToan,{
      PageIndex:this.PageIndexHistory,
      PageSize:this.PageSizeHistory,
      MaTheKhach:this.selectedGrid?.MaTheKhach
    }).subscribe(res=>{
      this.listHistory = res.Data.Data;
      this.TotalItemsHistory = res.Data.OutputParams.TotalItems;
    })
  }

  onAdd(){
    this.ResetModel();
    this.dialogCapPhat.show();
  }

  onEdit(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }
    this.dialogCapPhat.show();
  }

  onDelete(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }

    this._noti.Confirm({
      content:this.I18nLang.Common.WantToDelete,
      title:this.I18nLang.Common.Alert,
      OkFunction:()=>{
        this._api.post(AppAPIConst.TheKhach.capthekhach_spDeleteData,{
          strCode:this.selectedGrid?.ID,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.PageIndex = 0;
            this.SearchText = ''
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
            this.getListCapPhat()
          }
        })
      }
    })

  }

  onTraThe(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }
    this.dialogTraThe.show();
  }

  onSubmitTraThe(){
    this._api.post(AppAPIConst.TheKhach.capthekhach_spTraThe,{
      ID:this.selectedGrid?.ID
    }).subscribe(res=>{
      if(res && res.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error.Message)
          return;
        }
        this.PageIndex = 0;
        this.dialogTraThe.hide();
        this.SearchText = ''
        this.ResetModel();
        this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
        this.getListCapPhat()
      }
    })
  }



}
