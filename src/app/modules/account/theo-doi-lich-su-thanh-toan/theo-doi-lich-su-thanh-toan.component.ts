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
  listHistory:any[] = []
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalPages:number;
  totalItems:number;

  tblBU : Array<any> = []
  tblBoPhan : Array<any> = []
  tblEmployees : Array<any> = []
  tblEmployeesDialog : Array<any> = []
  tblThang : Array<any> = []

  selectetedBU:any
  selectetedBoPhan:any
  selectetedEmployees:any;
  lstEmpSelected:Array<any> = []
  selectetedThang:any

  constructor(private _api:ApiHttpService){}
  ngOnInit(): void {
    this.getConfig();
  }

  InitNested(tabs: any[], ParentCode: string | null): any[] {
    const nestedTabs: any[] = [];
    const Empty: any[] = [];
    for (const tab of tabs) {
      if (tab.ParentCode === ParentCode) {
        const nestedTab = { ...tab, Children:Empty};
        nestedTab.Children = this.InitNested(tabs, tab.DepartmentCode);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }

  LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      Option:7
    },true).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listHistory = res.Data.Data
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }


  getConfig(){
    this._api.post(AppAPIConst.CapPhatDinhMucNV.capdinhmuc_spgetDefault).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.tblBU = res.Data.tblBU
        this.tblBoPhan = this.InitNested(res.Data.tblBoPhan,null)
        this.tblEmployees = res.Data.tblEmployees
        this.tblEmployeesDialog = res.Data.tblEmployees
        this.tblThang = res.Data.tblThang
      }
    })
  }

  ClickPage(page:any){
    this.PageIndex = page;
    this.LoadListHistory();
  }


}
