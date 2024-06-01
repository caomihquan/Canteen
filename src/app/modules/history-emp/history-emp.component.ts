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
  constructor(private _api :ApiHttpService,private _auth:AuthService){
    this.LoadListHistory();
  }

   LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this._auth.getUser()?.UserID,
      Option:12
    }).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listHistory = res.Data.Data
        this.TotalItems = res.Data.OutputParams.TotalItems
      }
    })
  }

  ClickPage(page:any){
    this.PageIndex = page;
    this.LoadListHistory();
  }
}
