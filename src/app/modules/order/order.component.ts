import { Component, OnInit } from "@angular/core";
import { AppCommon } from "src/app/shares/constants/AppCommon";
import { fnCommon } from "src/app/shares/helpers/common";
import { UserModel } from "src/app/shares/models/user-model";
import { AuthService } from "src/app/shares/services/authentication/authentication.service";
import { OrdinalService } from "src/app/shares/services/ordinal/ordinal.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalComponent } from "src/app/shares/components/modal/modal.component";
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  today = fnCommon.convertTo0h(new Date().toISOString())
  selectedTab = 1;
  height = window.innerHeight - 220
  listAllBook = [
    {
      ID:1,
      Name:"Món ăn chính",
      SL:4
    },
    {
      ID:2,
      Name:"Món ăn phụ",
      SL:2
    },
    {
      ID:3,
      Name:"Tráng miệng",
      SL:1
    },
  ]
  XuDinhMuc = 330
  XuNapThem = 0
  Note:string;
  listFood = [
    {
      FoodID:1,
      Name:"Cơm tấm",
      SL:54,
      Mota:'Cơm tấm thơm ngon',
      Image:'comtam.png',
      Price:40000,
      Group:1
    },
    {
      FoodID:2,
      Name:"Bánh canh cá lóc",
      SL:46,
      Image:'banhcanhcaloc.png',
      Price:40000,
      Mota:'Bánh canh cá lócthơm ngon',
      Group:1

    },
    {
      FoodID:3,
      Name:"Bún riêu cua",
      SL:40,
      Image:'bunrieucua.png',
      Price:40000,
      Mota:'Bún riêu cua thơm ngon',
      Group:1
    },
    {
      FoodID:4,
      Name:"Bánh xèo",
      SL:38,
      Image:'banhxeo.png',
      Price:40000,
      Mota:'Bánh xèo thơm ngon',
      Group:1
    },
    {
      FoodID:5,
      Name:"Bún bò huế",
      SL:35,
      Image:'Bunbohue.png',
      Price:40000,
      Mota:'Bún bò huế" thơm ngon',
      Group:1
    },
    {
      FoodID:6,
      Name:"Crepe",
      SL:35,
      Image:'crepe.png',
      Price:40000,
      Mota:'Crepe thơm ngon',
      Group:2
    },
    {
      FoodID:7,
      Name:"Thăng Long",
      SL:35,
      Image:'thanglong.png',
      Price:40000,
      Mota:'Thăng Long thơm ngon',
      Group:3
    },
  ]
  listFoodFilter:any[] = []
  listAddFood:any[] = []
  maxSL:number = 0;
  defaultColor= AppCommon.defaultColor;
  user:UserModel | null;
  modalRef: BsModalRef;

  constructor(
    private _auth:AuthService,
    protected _orinal:OrdinalService,
    private _modalService: BsModalService,

  ){
    this.user = this._auth.getUser();
  }
  ngOnInit() {
    // this.maxSL =  this.listEachBook.reduce((max, book) => Math.max(max, book.SL), 0);
    // console.log(this.maxSL);
    if(this.selectedTab == 1){
      this.listFoodFilter = this.listFood
      return
    }
    this.listFoodFilter = this.listFood.filter(x =>x.Group == this.selectedTab + 1)
  }

  getPhoto(){
    return fnCommon.ConvertPhotoEmpByUserID(this.user?.UserID ?? '');
  }

  ClickTabFood(index:number){
    if(this.selectedTab == index) return;
    this.selectedTab = index;
    if(this.selectedTab == 1){
      this.listFoodFilter = this.listFood
      return
    }
    this.listFoodFilter = this.listFood.filter(x =>x.Group == this.selectedTab - 1)
  }


  AddMon(item:any){
    var exists = this.listAddFood.some((x:any) =>x.FoodID == item.FoodID)
    if(exists){
      this.listAddFood = this.listAddFood.filter((x:any) => x.FoodID != item.FoodID)
      this._orinal.setCoin(this._orinal.Coin + (item.Price/1000))
    }
    else{
      this.listAddFood = [...this.listAddFood,item];
      if(this._orinal.Coin - (item.Price/1000) < 0){
        this.listAddFood = this.listAddFood.filter((x:any) => x.FoodID != item.FoodID)
        alert('vượt số xu định mức')
        return;
      }
      this._orinal.setCoin(this._orinal.Coin - (item.Price/1000))

    }


  }

  ActiveItem(item:any){
    var list = this.listAddFood.map(x =>x.FoodID)
    return list.some(x => x == item.FoodID)
  }

  OrderFood(){
    if(this.listAddFood.length == 0){
      const initialState = {
        title:"Thông báo",
        content:"Vui lòng chọn món",
      };
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
    var day = this.today
    if(this.today.includes('Z')){
       day = fnCommon.formatDateddMMYYYY(this.today)
    }
    const initialState = {
      title:"Thành Công",
      content:`Bạn đã đặt món cho ngày ${day} thành công`,
    };
    this.modalRef = this._modalService.show(ModalComponent,{initialState});
    return;
  }



  TotalPay(){
    return this.listAddFood.map(x=>(x.Price / 1000)).reduce((x,y) => x + y,0)
  }

}
