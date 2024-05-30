import { Component, OnInit, Renderer2, signal } from '@angular/core';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { fnCommon } from 'src/app/shares/helpers/common';

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
  height:number = (window.innerHeight - 202)
  heightHistory:number = (window.innerHeight - 300)
  searchText:string;
  selectedFood:any;
  widthRight = window.innerWidth - 350;
  modalRef: BsModalRef
  I18nLang:any
  defaultColor = AppCommon.defaultColor

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

  listCard = [
    {
      MaThe:"CARD001",
      Note:"Thẻ cho khách bên ngoài công ty sử dụng",
      Status:0,
      SoXu:100,
      LanNapGanNhat:new Date().toISOString()
    }
  ]

  listHistory = [
    {
      NgayCapPhat:new Date().toISOString(),
      Note:"Khách hàng đến công ty công tác",
      Status:false,
      BeginDate:new Date().toISOString(),
      EndDate:new Date().toISOString(),
      UserName:'cmquan',
      CreatedBy:'cmquan',
      NguoiNhan:'cmquan',
      NguoiTra:'cmquan',
      TongXu:300

    }
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
    ){
      _translate.use('vn');
  }
  ngOnInit() {
    this.getLanguage()
    this._ordinal.finishSideBar.subscribe(res=>{
      if(res){
          this.GetMenu();
      }
    })
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