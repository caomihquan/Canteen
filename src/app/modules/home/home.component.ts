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
      SL:112
    },
    {
      ID:2,
      Name:"Món ăn phụ",
      SL:50
    },
    {
      ID:3,
      Name:"Tráng miệng",
      SL:99
    },
  ]
  listEachBook = [
    {
      Name:"Cơm tấm",
      SL:54
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48
    },
    {
      Name:"Bún riêu cua",
      SL:40
    },
    {
      Name:"Bún chả hà nội",
      SL:38
    },
    {
      Name:"Canh chua cá lóc",
      SL:35
    },
  ]
  maxSL:number = 0;
  defaultColor= AppCommon.defaultColor
  constructor(){}
  ngOnInit() {
    this.maxSL =  this.listEachBook.reduce((max, book) => Math.max(max, book.SL), 0);
    console.log(this.maxSL);
  }
  
}
