import { Component, OnInit } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-cap-phat-dinh-muc',
  templateUrl: './cap-phat-dinh-muc.component.html',
  styleUrls: ['./cap-phat-dinh-muc.component.scss']
})
export class CapPhatDinhMucComponent implements OnInit {

  listCapPhat:Array<any> = [];
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  height:number = (window.innerHeight - 202)
  totalPages:number;
  totalItems:number;

  getPhoto = fnCommon.ConvertPhotoEmpByUserID;

  constructor(private _api:ApiHttpService){}
  ngOnInit(): void {
    this.LoadListMember();
  }
  RowSelected(event:any,type?:number){
    if(type == 1){
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // console.log( this.ListSelected);
    }
    else{
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // this.ListSelected.push(event.data["UnionCode"])
    }
  }

  LoadListMember(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      Option:6
    },true).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listCapPhat = res.Data.Data
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }

  CapPhatDinhMuc(){

  }
}
