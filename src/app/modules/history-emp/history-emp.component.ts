import { Component } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';

@Component({
  selector: 'app-history-emp',
  templateUrl: './history-emp.component.html',
  styleUrls: ['./history-emp.component.scss']
})
export class HistoryEmpComponent {
  listHistory:Array<any>
  PageSize = AppCommon.PageSize;
  PageIndex = AppCommon.PageIndex;
  TotalItems = 0;
  heightGrid = fnCommon.getGridHeight();
  SoTienThanhToan:any;
  SoTienConLai:any;
  ListDowCode:Array<any> = []
  selectedMonth:any
  constructor(private _api :ApiHttpService,private _auth:AuthService){
    this.LoadListHistory();
    this.GetValueList();
  }

   LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this._auth.getUser()?.UserID,
      Option:12,
      DowCode:this.selectedMonth?.DowCode ?? null
    }).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listHistory = res.Data.Data
        this.TotalItems = res.Data.OutputParams.TotalItems
        this.SoTienThanhToan = res.Data.OutputParams.TongTienThanhToan
        this.SoTienConLai = res.Data.OutputParams.TongTienConLai
      }
    })
  }

  GetValueList(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      Option:13
    }).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.ListDowCode = res.Data.Data;
        if(this.ListDowCode.length > 0){
          var data = this.ListDowCode.find(x => x.DowCode.split('/')[1] == (new Date().getMonth() + 1))
          this.selectedMonth =  data
        }
        // this.listHistory = res.Data.Data
        // this.TotalItems = res.Data.OutputParams.TotalItems
        // this.SoTienThanhToan = res.Data.OutputParams.TongTienThanhToan
        // this.SoTienConLai = res.Data.OutputParams.TongTienConLai
      }
    })
  }

  ClickPage(page:any){
    this.PageIndex = page;
    this.LoadListHistory();
  }

  ClickDowCode(item:any){
    if(item == this.selectedMonth) return;
    this.selectedMonth = item;
    this.PageIndex = 0;
    this.TotalItems = 0
    this.LoadListHistory();
  }
}
