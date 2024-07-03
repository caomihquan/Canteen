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
  textSucess = '';
  Line:any;

  ResponseCard:any;
  Amount:string = '0';
  EditInput = false;
  IsAmount = false
  constructor(private _api:ApiHttpService,private _activeRoute:ActivatedRoute){

    this._activeRoute.queryParams.subscribe(res=>{
      if(res && res['line']){
        this.Line = res['line']
        if(this.Line == '20'){
          this.EditInput = true
        }
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
        this.BarCode = '';
        if(res.Data.tblInfo[0].Error == "msg001"){
          this.textSucess = "Tài khoản của bạn hiện còn dưới 50.000 VND, vui lòng cân nhắc chi tiêu hợp lý"
          this.IsError = false;
          return
        }
        if(res.Data.tblInfo[0].Error){
          this.textError = res.Data.tblInfo[0].Error
          this.IsError = true;
          return
        }
        this.textSucess = "Đến quầy để nhận món / Go to the counter to receive your order"
        this.IsError = false;
      }
    })
  }

  ScanCard2(){
    this.IsInit = true;
    this._api.post(AppAPIConst.Scan.Line_GetInfo2,{
      BarCode:this.BarCode,
      Line:this.Line,
      Amount:this.Amount
    })
    .subscribe(res=>{
      if(res.Data){
        this.ResponseCard = res.Data.tblInfo[0];
        this.BarCode = '';
        if(res.Data.tblInfo[0].Error == "msg001"){
          this.textSucess = "Tài khoản của bạn hiện còn dưới 50.000 VND, vui lòng cân nhắc chi tiêu hợp lý"
          this.IsError = false;
          return
        }
        if(res.Data.tblInfo[0].Error){
          this.textError = res.Data.tblInfo[0].Error
          this.IsError = true;
          return
        }
        this.textSucess = "Đến quầy để nhận món / Go to the counter to receive your order"
        this.IsError = false;
      }
    })
  }


  BlurInput(evt:any){
    var a = evt.target as HTMLElement
    if(!this.IsAmount){
      document.getElementById('inputscan')?.focus();
    }
  }

  BlurAmount(event:any){
    this.IsAmount = false;
    document.getElementById('inputscan')?.focus();
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
