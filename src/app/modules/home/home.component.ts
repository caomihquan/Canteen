import { Component, OnInit } from "@angular/core";
import { AppCommon } from "src/app/shares/constants/AppCommon";
import { fnCommon } from "src/app/shares/helpers/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today = fnCommon.convertTo0h(new Date().toISOString())
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
  listEachBook = [
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
  maxSL:number = 0;
  defaultColor= AppCommon.defaultColor
  constructor(){}
  ngOnInit() {
    this.maxSL =  this.listEachBook.reduce((max, book) => Math.max(max, book.SL), 0);
    console.log(this.maxSL);
  }

  filterGroup(groupID:any){
    return this.listEachBook.filter(x =>x.Group == groupID);
  }

}
