import { Component } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-cap-phat-dinh-muc',
  templateUrl: './cap-phat-dinh-muc.component.html',
  styleUrls: ['./cap-phat-dinh-muc.component.scss']
})
export class CapPhatDinhMucComponent {
  listCapPhat:Array<any> = [];
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };


  RowSelected(event:any,type?:number){
    if(type == 1){
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // console.log( this.ListSelected);
    }
    else{
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // this.ListSelected.push(event.data["UnionCode"])
    }
  }
}
