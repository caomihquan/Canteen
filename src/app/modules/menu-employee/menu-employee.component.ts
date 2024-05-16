import { Component, OnInit, Renderer2 } from '@angular/core';
import { MenuService } from './services/menu-employee.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-menu-employee',
  templateUrl: './menu-employee.component.html',
  styleUrls: ['./menu-employee.component.scss']
})
export class MenuEmployeeComponent implements OnInit {
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

  listMenuOrder:any = [
  ]



  listFood = [
    {
      FoodID:1,
      Name:"Cơm tấm",
      SL:54,
      Mota:'Cơm tấm thơm ngon',
      Image:'comtam.png',
      Price:40000,
      Group:1,
      SLOrder:1
    },
    {
      FoodID:2,
      Name:"Bánh canh cá lóc",
      SL:46,
      Image:'banhcanhcaloc.png',
      Price:40000,
      Mota:'Bánh canh cá lócthơm ngon',
      Group:1,
      SLOrder:1

    },
    {
      FoodID:3,
      Name:"Bún riêu cua",
      SL:40,
      Image:'bunrieucua.png',
      Price:40000,
      Mota:'Bún riêu cua thơm ngon',
      Group:1,
      SLOrder:1
    },
    {
      FoodID:4,
      Name:"Bánh xèo",
      SL:38,
      Image:'banhxeo.png',
      Price:40000,
      Mota:'Bánh xèo thơm ngon',
      Group:1,
      SLOrder:1
    },
    {
      FoodID:5,
      Name:"Bún bò huế",
      SL:35,
      Image:'Bunbohue.png',
      Price:40000,
      Mota:'Bún bò huế" thơm ngon',
      Group:1,
      SLOrder:1
    },
    {
      FoodID:6,
      Name:"Crepe",
      SL:35,
      Image:'crepe.png',
      Price:40000,
      Mota:'Crepe thơm ngon',
      Group:2,
      SLOrder:1
    },
    {
      FoodID:7,
      Name:"Thăng Long",
      SL:35,
      Image:'thanglong.png',
      Price:40000,
      Mota:'Thăng Long thơm ngon',
      Group:3,
      SLOrder:1
    },
  ]

  listTabGroup = [
    {
      ID:0,
      Name:"Tất cả",
    },
    {
      ID:1,
      Name:"Món ăn chính",
    },
    {
      ID:2,
      Name:"Món ăn phụ",
    },
    {
      ID:3,
      Name:"Tráng miệng",
    },
  ]
  listFoodFilter:any[] = []
  listAddFood:any[] = []

  selectedTab = 0;
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
    //this.getLanguage()
    // this._ordinal.finishSideBar.subscribe(res=>{
    //   if(res){
    //       this.GetMenu();
    //   }
    // })

    if(this.selectedTab == 0){
      this.listFoodFilter = this.listFood
      return
    }
    this.listFoodFilter = this.listFood.filter(x =>x.Group == this.selectedTab + 1)
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
        this.listMenuOrder = res.Data.lstOfTinTuc;
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
    // if(!this.selectedMenu){
    //   const initialState = {
    //     title: this.I18nLang.Common.Alert,
    //     content:this.I18nLang.Error.NoRowSelected,
    //   }
    //   this.modalRef = this._modalService.show(ModalComponent,{initialState});
    //   return;
    // }
  }

  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
      this.GetMenu();
    }
  }

  ResetModel(){
    this.listMenuOrder = [];
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
    if(this.selectedTab == 0){
      this.listFoodFilter = this.listFood
      return
    }
    this.listFoodFilter = this.listFood.filter(x =>x.Group == this.selectedTab)
  }

  ActiveItem(item:any){
    var list = this.listAddFood.map(x =>x.FoodID)
    return list.some(x => x == item.FoodID)
  }
  AddMon(item:any){
    var exists = this.listAddFood.some((x:any) =>x.FoodID == item.FoodID)
    if(exists){
      this.listAddFood = this.listAddFood.filter((x:any) => x.FoodID != item.FoodID)
      this._ordinal.setCoin(this._ordinal.Coin + (item.Price/1000))
    }
    else{
      this.listAddFood = [...this.listAddFood,item];
      if(this._ordinal.Coin - (item.Price/1000) < 0){
        this.listAddFood = this.listAddFood.filter((x:any) => x.FoodID != item.FoodID)
        alert('vượt số xu định mức')
        return;
      }
      this._ordinal.setCoin(this._ordinal.Coin - (item.Price/1000))
    }
  }

  getGroupName(GroupID:any){
    return this.listTabGroup.filter(x=> x.ID == GroupID)
  }

  DeleteFood(item:any){
    var exists = this.listAddFood.some((x:any) =>x.FoodID == item.FoodID)
    if(exists){
      this.listAddFood = this.listAddFood.filter((x:any) => x.FoodID != item.FoodID)
      this._ordinal.setCoin(this._ordinal.Coin + (item.Price/1000))
    }
  }

  ChangeSLFood(event:any,item:any){
    // console.log(event.target.value);
    // if(!event.target.value){
    //   event.target.value = 0;
    // }
    // const index = this.listAddFood.findIndex(x => x.FoodID == item.FoodID)
    // this.listAddFood[index]['SL'] =  Prevent.target.value
    // console.log(this.listAddFood);


  }

  OrderFood(){
    var day = this.selectedDate
    if(this.selectedDate.includes('Z')){
       day = fnCommon.formatDateddMMYYYY(this.selectedDate)
    }
    var data = {
      Date:this.getDate(day),
      Day:new Date(this.getDate(day)).getDay(),
      ListOrder:this.listAddFood,
    };
    this.listAddFood = [];
    this.selectedDate = new Date().toISOString();
    this.listMenuOrder = [...this.listMenuOrder,data]
    console.log(this.listMenuOrder);

  }

  getDate(item:string){
    var date = item.split('-');
    return `${date[2]}/${date[1]}/${date[0]}`
  }
}
