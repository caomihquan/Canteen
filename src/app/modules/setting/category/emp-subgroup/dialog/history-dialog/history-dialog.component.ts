import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-history-dialog',
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.scss']
})
export class HistoryDialogComponent implements OnInit{
  @ViewChild('ejDialog') ejDialog: DialogComponent;
  protected isShow:boolean = false;
  height:number = window.innerHeight - 300;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  totalPages:number = 0;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number = 0;
  nhomphucode:string;
  listSubgroup = [
  ]
  constructor(private _api:ApiHttpService ){

  }
  ngOnInit(): void {
    this.totalItems = this.listSubgroup.length;
  }


  protected getListHistory(id:string){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:2,
      PageInde:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      debugger;
      console.log(res);
      this.listSubgroup = res.Data.Data;
      this.listSubgroup = this.listSubgroup.filter(x => x['NhomPhuCode'] == id);
      this.totalItems = res.Data.OutputParams.totalItems
    })
  }

  protected onBeforeOpen(event:any){
      event.maxHeight = '100vh'
  }
  LoadWithIndex(evt:any){
    debugger
    if(evt?.currentPage){
      // this.PageIndex = evt?.currentPage;
      // this.LoadListUnions();
    }
  }
  public onOpenDialog(id:string){

      this.isShow = true;
      this.nhomphucode = id;
      this.getListHistory(this.nhomphucode);
      if(this.isShow){
        this.ejDialog?.show();
      }
  }

  protected selectedRowTable(event:any){

  }

}
