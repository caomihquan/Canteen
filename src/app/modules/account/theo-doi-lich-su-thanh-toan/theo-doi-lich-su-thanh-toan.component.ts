import { Component, OnInit } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';

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
  SearchText:string;
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
  I18nLang:any
  constructor(private _api:ApiHttpService,private _langService:LanguageService){
    this.I18nLang = this._langService.I18LangService
  }
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
    this._api.post(AppAPIConst.QuanLyNhanVien.theodoilichnv_spGetData,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.SearchText,
      BU:this.selectetedBU?.BU,
      BoPhan:this.selectetedBoPhan?.DepartmentCode,
      EmployeeCode:this.selectetedEmployees,
      Thang:this.selectetedThang?.Thang,
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

  handleSelectEmp(emp:any){
    // if(emp == null){
    //   this.lstEmpSelected = []
    //   this.selectetedEmployees = ''
    //   return;
    // }
    // if(emp?.IsChecked){
    //   this.lstEmpSelected = this.lstEmpSelected.filter(x => x.EmployeeCode != emp.EmployeeCode)
    //   this.lstEmpSelected.push(emp)
    // }
    // else{
    //   this.lstEmpSelected = this.lstEmpSelected.filter(x => x.EmployeeCode != emp.EmployeeCode)
    // }
    this.lstEmpSelected = emp
    this.selectetedEmployees = this.lstEmpSelected.map(x => x?.EmployeeCode ?? '').join(';')
  }

  ViewData(){
    this.PageIndex = 0;
    this.LoadListHistory();
  }

}
