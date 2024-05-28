import { Component, OnInit } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-co-cau-to-chuc',
  templateUrl: './co-cau-to-chuc.component.html',
  styleUrls: ['./co-cau-to-chuc.component.scss']
})
export class CoCauToChucComponent implements OnInit {
 
  height:number = window.innerHeight
  tabSelected:any
  listDepartment:Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmpByUserID;

  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ToggleTabs(item:any){
    // if(item.Children.length == 0){

    // }
    this.tabSelected = item
    
  }
}
