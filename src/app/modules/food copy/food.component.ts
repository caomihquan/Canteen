import { Component, OnInit, Renderer2 } from '@angular/core';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  heightHistory:number = (window.innerHeight - 300)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedFood:any;
  
  modalRef: BsModalRef
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
 
  ListPhanLoai = [
    {
      ID:1,
      Name:"Món ăn chính"
    },
    {
      ID:2,
      Name:"Món ăn phụ"
    },
    {
      ID:1,
      Name:"Tráng miệng"
    }
  ]
  selectPhanLoai:any;

  listFood = [
    {
      Name:"Cơm tấm",
      SL:54,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bún riêu cua",
      SL:40,
      GroupID:2,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bún riêu cua",
      SL:40,
      GroupID:3,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
  ]
  listHistory = [
    {
      Price:'45000VND',
      Note:'Tăng vật giá',
      CreatedOn:new Date().toISOString(),
      CreatedBy:'cmquan'
    },
  ]
  moTa:string;
  tenMonAn:string;
  donGia:string;
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


  AddFood(){
    
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

  DeleteMenu(){
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

  EditFood(){
    if(!this.selectedFood){
      const initialState = {
        title: this.I18nLang.Common.Alert,
        content:this.I18nLang.Error.NoRowSelected,
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
  }

  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
      this.GetMenu();
    }
  }

  ResetModel(){
    this.listFood = [];
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }

  PostFood(){
    

  }
  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

 

}
