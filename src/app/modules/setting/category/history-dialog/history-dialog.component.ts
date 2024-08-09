import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  GridModule, PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogAllModule, DialogComponent } from '@syncfusion/ej2-angular-popups';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss'],
  standalone:true,
  imports:[DialogAllModule,GridModule,CommonModule,FormsModule,GridViewComponent]
})
export class HistoryDialogComponent{
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  @Input() Option:any
  @Input() ID:any
  height:number = window.innerHeight  - 180;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  totalPages:number = 0;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number = 0;
  lstHistory = [
  ]
  getPhoto = fnCommon.ConvertPhotoEmpByUserID
  I18Lang:any
  constructor(private _api:ApiHttpService,private _lang:LanguageService ){
    this.I18Lang = this._lang.I18LangService
  }



  getListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:this.Option,
      ID:this.ID,
      PageInde:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      this.lstHistory = res.Data.Data;
      this.totalItems = res.Data.OutputParams.totalItems
      console.log(res);
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
