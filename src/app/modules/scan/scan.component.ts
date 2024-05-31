import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {
  @ViewChild('dialog') dialog:any;
  listHistory:Array<any> = [];
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };
  BarCode:string
  IsError:boolean = false;
  IsInit = false;
  textError = '';
  Line:any;

  ResponseCard:any
  constructor(private _api:ApiHttpService,private _activeRoute:ActivatedRoute){

    this._activeRoute.queryParams.subscribe(res=>{
      if(res && res['line']){
        this.Line = res['line']
      }
    })
  }
  ScanCard(){

    this.IsInit = true;
    this._api.post(AppAPIConst.Scan.Line_GetInfo,{
      BarCode:this.BarCode,
      Line:this.Line
    })
    .subscribe(res=>{
      if(res.Data){
        this.ResponseCard = res.Data.tblInfo[0];
        console.log(res.Data)
        this.BarCode = '';
        if(res.Data.tblInfo[0].Error){
          this.textError = res.Data.tblInfo[0].Error
          this.IsError = true;
          return
        }
        this.IsError = false;
      }
    })
  }


  // LoadListHistory(){
  //   this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
  //     PageIndex:this.PageIndex,
  //     PageSize:this.PageSize,
  //     Option:7
  //   }).subscribe(res=>{
  //     if(res && res.Data){
  //       console.log(res);
  //       this.listHistory = res.Data.Data
  //       this.totalItems = res.Data.OutputParams.TotalItems
  //     }
  //   })
}
