import { Component, OnInit, Renderer2 } from '@angular/core';
import { MenuService } from './services/menu.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedMenu:any;
  
  modalRef: BsModalRef
  I18nLang:any
  defaultColor = AppCommon.defaultColor
  
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
 
  listMenu = [
    {
      Date: "2024/05/20",
      Day:2
    },
    {
      Date: "2024/05/21",
      Day:3
    },
    {
      Date: "2024/05/22",
      Day:4
    },
    {
      Date: "2024/05/23",
      Day:5
    },
    {
      Date: "2024/05/24",
      Day:6
    },
    {
      Date: "2024/05/25",
      Day:7
    }
  ]

  listEachBook = [
    {
      Name:"Cơm tấm",
      SL:54,
      GroupID:1
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48,
      GroupID:1
    },
    {
      Name:"Crepe",
      SL:40,
      GroupID:3
    },
    {
      Name:"Bún thịt nướng",
      SL:40,
      GroupID:2
    },
    {
      Name:"Bún bò huế",
      SL:48,
      GroupID:1
    },
    {
      Name:"Thăng long",
      SL:40,
      GroupID:3
    },
  ]

  selectedTab = 1
  constructor(
    private _ordinal:OrdinalService,
    private _modalService: BsModalService,
    private _languageService:LanguageService,
    private _translate:TranslateService,
    private _menuService:MenuService
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

 
  fnSelectedRule(){
    const initialState = {
      title:this.I18nLang.Common.Alert,
      content:this.I18nLang.Error.NoRowSelected,
    }
    this.modalRef = this._modalService.show(ModalComponent,{initialState});
  }


  AddMenu(){
    
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedMenu = item;
  }

  

  GetMenu(){
    this._menuService.GetRules({
      Status:2,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchVal:this.searchText
    }).subscribe(res=>{
      if(!res.Error){
        console.log(res);
        this.listMenu = res.Data.lstOfTinTuc;
        this.totalItems = res.Data.Output[0].TotalItems
      }
    })
  }

  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
      this.GetMenu();
    }
  }

  DeleteMenu(){
    if(!this.selectedMenu){
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

  EditMenu(){
    if(!this.selectedMenu){
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
    this.listMenu = [];
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }

  
 

  PostMenu(){
    

  }

  
  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  ClickTabFood(index:number){
    if(this.selectedTab == index) return;
    this.selectedTab = index;
  }

}
