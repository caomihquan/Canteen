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
      Name:"Cơm tấm",
      SL:54,
      Image:'comtam.png'
    },
    {
      Name:"Bánh canh cá lóc",
      SL:46,
      Image:'banhcanhcaloc.png'

    },
    {
      Name:"Bún riêu cua",
      SL:40,
      Image:'bunrieucua.png'
    },
    {
      Name:"Bún chả hà nội",
      SL:38,
      Image:'bunrieucua.png'
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
