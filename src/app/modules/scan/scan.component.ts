import { Component, ViewChild } from '@angular/core';
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
  textError = ''
  constructor(private _api:ApiHttpService){}
  ScanCard(){

    this.IsInit = true;
    this._api.post(AppAPIConst.Scan.Line_GetInfo,{
      BarCode:this.BarCode,
      Line:1
    })
    .subscribe(res=>{
      if(res.Data){
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
}
