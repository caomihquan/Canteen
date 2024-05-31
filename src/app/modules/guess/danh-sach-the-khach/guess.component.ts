import { Component, OnInit, Renderer2, ViewChild, signal } from '@angular/core';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { fnCommon } from 'src/app/shares/helpers/common';
import { GuessService } from '../services/guess.service';
import { CapPhatDinhMucDialogComponent } from './CapPhatDinhMuc-dialog/CapPhatDinhMuc-dialog.component';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  totalHistoryCPItems: number;
  height:number = (window.innerHeight - 202)
  heightHistory:number = (window.innerHeight - 300)
  searchText:string;
  selectedFood:any;
  widthRight = window.innerWidth - 350;
  modalRef: BsModalRef
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  @ViewChild('capphatdinhmuc') capphatdinhmuc: CapPhatDinhMucDialogComponent
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;

  selectedTabs = signal(0);

  listGuess = [
    {
      Code:"TK001",
      Note:"Khách hàng đến công ty công tác",
      Status:false,
      BeginDate:new Date().toISOString(),
      EndDate:new Date().toISOString(),
      UserName:'cmquan',
      CreatedBy:'cmquan',
      NguoiNhan:'cmquan',
      NguoiTra:'cmquan',
      TongXu:300
    },{
      Code:"TK002",
      Note:"Khách hàng đến công ty công tác",
      Status:false,
      BeginDate:new Date().toISOString(),
      EndDate:new Date().toISOString(),
      UserName:'cmquan',
      CreatedBy:'cmquan',
      NguoiNhan:'cmquan',
      NguoiTra:'cmquan',
      TongXu:250
    },{
      Code:"TK003",
      Note:"Khách hàng đến công ty công tác",
      Status:false,
      BeginDate:new Date().toISOString(),
      EndDate:new Date().toISOString(),
      UserName:'cmquan',
      CreatedBy:'cmquan',
      NguoiNhan:'cmquan',
      NguoiTra:'cmquan',
      TongXu:500
    },{
      Code:"TK004",
      Note:"Khách hàng đến công ty công tác",
      Status:false,
      BeginDate:new Date().toISOString(),
      EndDate:new Date().toISOString(),
      UserName:'cmquan',
      CreatedBy:'cmquan',
      NguoiNhan:'cmquan',
      NguoiTra:'cmquan',
      TongXu:500
    }
  ]

  listFood=[{
    Name:'Chả cá'
  },
  {
    Name:'Trứng chiên'
  },
  {
    Name:'Mực một nắng'
  }]

  listCard = []

  listHistory:any[] = [
    // {
    //   NgayCapPhat:new Date().toISOString(),
    //   Note:"Khách hàng đến công ty công tác",
    //   Status:false,
    //   BeginDate:new Date().toISOString(),
    //   EndDate:new Date().toISOString(),
    //   UserName:'cmquan',
    //   CreatedBy:'cmquan',
    //   NguoiNhan:'cmquan',
    //   NguoiTra:'cmquan',
    //   TongXu:300

    // }
  ]

  listHistoryXu = [
    {
      NgayPhatSinh:new Date().toISOString(),
      Type:0,
      CreatedBy:'CARD001',
      Total:-100
    },
    {
      NgayPhatSinh:new Date().toISOString(),
      Type:1,
      CreatedBy:'cmquan',
      Total:100
    }
  ]


  constructor(
    private _ordinal:OrdinalService,
    private _modalService: BsModalService,
    private _languageService:LanguageService,
    private _translate:TranslateService,
    private guessService:GuessService
    ){
      _translate.use('vn');
  }
  ngOnInit() {
    this.getLanguage()
    // this._ordinal.finishSideBar.subscribe(res=>{
    //   if(res){
    //       this.GetMenu();
    //   }
    // })
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
        debugger;
          this.listCard = res.Data.Data;
          this.totalItems = res.Data.OutputParams.TotalItems;
      });
  }

  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }


  RegisterCardForCustomer(){

  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedFood = item;
  }

  onOpenCapPhatDinhMuc(event:any){
    let thekhach = event.rowData;
    this.capphatdinhmuc.onOpenDialog(thekhach['MaTheKhach']);
  }

  GetMenu(){

  }

  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
      this.GetMenu();
    }
  }

  DeleteCardForCustomer(){
    if(!this.selectedFood){
      const initialState = {
        title: this.I18nLang.Common.Alert,
        content:this.I18nLang.Error.NoRowSelected,
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
    const initialState = {
      title: this.I18nLang.Common.Notification,
      content:this.I18nLang.Common.WantToDelete,
      fnYes:()=>{

      },
      fnNo:()=>{
        this.modalRef.hide()
      }
    }
    this.modalRef = this._modalService.show(ModalComponent,{initialState});

  }

  EditResigerCardForCustomer(){
    if(!this.selectedFood){
      const initialState = {
        title: this.I18nLang.Common.Alert,
        content:this.I18nLang.Error.NoRowSelected,
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
  }

  TakeBackCard(){

  }

  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
      this.GetMenu();
    }
  }

  ResetModel(){
    this.listGuess = [];
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }


  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  ClickTabs(tab:number){
    this.selectedTabs.set(tab);
  }

  AddCard(){

  }
  EditCard(){

  }
  DeleteCard(){

  }



}
