import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  GridModule, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
  standalone:true,
  imports:[DialogAllModule,GridModule,CommonModule,FormsModule,GridViewComponent]
})
export class HistoryDialogComponent{
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  height:number = window.innerHeight  - 180;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  totalPages:number = 0;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number = 0;
  lstHistory = [
  ]
  constructor(private _api:ApiHttpService ){

  }



  getListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:2,
      PageInde:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      this.lstHistory = res.Data.Data;
      this.totalItems = res.Data.OutputParams.totalItems
    })
  }

  show(){
    this.ejDialog.show()
    this.getListHistory();
  }

  onBeforeOpen(event:any){
    event.maxHeight = '100vh'
  }

  selectedRowTable(evt:any){

  }

  ClickPage(evt:any){
    this.PageIndex = evt;
    this.getListHistory();
  }



}
