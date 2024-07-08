import { Component, OnInit, ViewChild } from '@angular/core';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { fnCommon } from 'src/app/shares/helpers/common';
import { GuessService } from '../services/guess.service';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd:AppDialogComponent
  @ViewChild('dialogCapPhat') dialogCapPhat:AppDialogComponent
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  totalHistoryCPItems: number;
  height:number = (window.innerHeight - 202)
  heightHistory:number = (window.innerHeight - 170)
  searchText:string;
  selectedGrid:any;
  widthRight = window.innerWidth - 350;
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listCard:Array<any> = []

  listHistory:any[] = []
  listHistoryXu = []

  MaThe:string;
  GhiChu:string;
  TinhTrang = '0';
  DinhMucConLai:string;
  HanMucSuDung:string;
  BarCode:string;
  DinhMucCongThem:string
  IsEdit:boolean = false;

  constructor(
    private _languageService:LanguageService,
    private guessService:GuessService,
    private _api:ApiHttpService,
    private _noti:NotificationService
    ){
      this.I18nLang = this._languageService.I18LangService
  }
  ngOnInit() {
    this.initTheKhachData();
  }


  onOpenCPHistory(theID:string){
    this.listHistory =[];
    var data = {
      Option: 10,
      SearchText: '',
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    }
    this.guessService.TheKhach_GetHistoryTK(data).subscribe((res) => {
      var data = res.Data.Data;
      if(data.length > 0){
        this.listHistory = (data as any[]).filter(x => x['MaTheKhach'] == theID);
        this. totalHistoryCPItems = res.Data.OutputParams.TotalItems;
      }
      else{
        this.listHistory =[];
        this.ResetModel()
      }
    });
  }
  onOpenXuHistory(theID:string){
    this.listHistory =[];
    var data = {
      Option: 10,
      SearchText: '',
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    }
  this.guessService.TheKhach_GetHistoryTK(data).subscribe((res) => {
        var data = res.Data.Data;
        if(data.length > 0){
          this.listHistory = (data as any[]).filter(x => x['MaTheKhach'] == theID);
          this. totalHistoryCPItems = res.Data.OutputParams.TotalItems;
        }
        else{
          this.listHistory =[];
          this.ResetModel()
        }

    });
  }
  initTheKhachData(condition?:boolean){
    this.guessService.TheKhach_Get(this.PageIndex,'',this.PageSize).subscribe((res) =>{
        this.listCard = res.Data.Data;
        console.log(this.listCard);
        this.totalItems = res.Data.OutputParams.TotalItems;
    });
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedGrid = item;
    this.MaThe = item.MaTheKhach
    this.HanMucSuDung = item.HanMucSuDung
    this.BarCode = item.V3ID
    this.GhiChu = item.Mota
    this.DinhMucConLai = item.DinhMucConLai
  }




  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
    }
  }



  ClickPagerIndex(evt:any){
    this.PageIndex = evt;
    this.initTheKhachData();
  }

  ResetModel(){
    this.MaThe = ''
    this.GhiChu = ''
    this.TinhTrang = '0'
    this.DinhMucConLai = ''
    this.HanMucSuDung = ''
    this.BarCode = ''
  }


  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }



  AddCard(){
    this.ResetModel();
    this.IsEdit = false;
    this.dialogAdd.show();
  }
  EditCard(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }
    this.IsEdit = true;
    this.dialogAdd.show();
  }
  DeleteCard(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }
    this._noti.Confirm({
      content:this.I18nLang.Common.WantToDelete,
      title:this.I18nLang.Common.Alert,
      OkFunction:()=>{
        this._api.post(AppAPIConst.TheKhach.TheKhach_spDeleteData,{
          strCode:this.selectedGrid?.EmployeeCode,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.PageIndex = 0;
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
            this.initTheKhachData()
          }
        })
      }
    })
  }

  submitDialog(){
    this._api.post(AppAPIConst.TheKhach.thekhach_spPostData,{
      MaTheKhach:this.MaThe,
      Mota:this.GhiChu,
      BarCode:this.BarCode,
      HanMucSuDung:this.HanMucSuDung,
      DinhMucConLai:this.DinhMucConLai,
      TinhTrang:this.TinhTrang,
    }).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }

        this.ResetModel();
        this.PageIndex = 0
        this.initTheKhachData();
        this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
      }
    })
  }

  onOpenCapPhat(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18nLang.Error.NoRowSelected)
      return;
    }
    this.DinhMucCongThem = ''
    this.dialogCapPhat.show();
  }

  submitCapPhat(){
    this._api.post(AppAPIConst.TheKhach.thekhach_spcapdinhmuc,{
      DinhMucConLai:this.DinhMucCongThem,
    }).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }
        this.ResetModel();
        this.PageIndex = 0
        this.initTheKhachData();
        this._noti.ShowToastSuccess(this.I18nLang.Common.Success)
      }
    })
  }

}
