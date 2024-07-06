import { Component } from '@angular/core';
import { SideBarService } from '../../services/sidebar/sidebar.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcum',
  templateUrl: './breadcum.component.html',
  styleUrls: ['./breadcum.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule]
})
export class BreadcumComponent {

  header:any;
  headerParent:any;
  constructor(private _sideBar:SideBarService){
    this._sideBar.breadcrumb.subscribe(res=>{
      if(res){
        this.header = res
        this.headerParent = this._sideBar.ListSideBar.find(x =>x.FunctionID == res.ParentID)
        if(!this.headerParent){
          this.headerParent = res;
          this.header = null
        }
      }

    })
  }
}
