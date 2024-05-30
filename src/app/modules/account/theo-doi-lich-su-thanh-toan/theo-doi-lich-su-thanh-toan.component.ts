import { Component, OnInit } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-theo-doi-lich-su-thanh-toan',
  templateUrl: './theo-doi-lich-su-thanh-toan.component.html',
  styleUrls: ['./theo-doi-lich-su-thanh-toan.component.scss']
})
export class TheoDoiLichSuThanhToanComponent implements OnInit {
  listHistory:any[] = [{
    V3ID:'ádfdsf'
  }]
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalPages:number;
  totalItems:number;
  constructor(private _api:ApiHttpService){}
  ngOnInit(): void {
    this.LoadListHistory();
  }

  LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      Option:7
    }).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listHistory = res.Data.Data
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }


}
