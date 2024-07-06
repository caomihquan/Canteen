import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { SidebarModel } from 'src/app/shares/models/SidebarModel';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-co-cau-to-chuc',
  templateUrl: './co-cau-to-chuc.component.html',
  styleUrls: ['./co-cau-to-chuc.component.scss']
})
export class CoCauToChucComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd:DialogComponent
  height:number = window.innerHeight
  tabSelected:any
  listDepartment:Array<any> = []
  listDepartmentOrigin:Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmpByUserID;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  TotalItems = 0
  listEmployee:Array<any> = []
  width:number = window.innerWidth - 254 - 300

  MaDonVi:string;
  TenDonVi:string;
  DonViCha:any;
  selectedGrid:any;
  constructor(
    private _api:ApiHttpService,
    protected _languageService:LanguageService,
    private _noti:NotificationService
  ){
  }

  ngOnInit(): void {
    this.getCoCauToChuc();
  }

  // getLanguage = async() => {
  //   this.I18Lang = await this._languageService.getLanguage();
  // }

  ToggleTabs(item:any){
    this.tabSelected = item
    if(this.tabSelected){
      this.PageIndex = 0;
      this.TotalItems = 0
      this.LoadEmployee();
    }
  }


  getCoCauToChuc(){
    this._api.post(AppAPIConst.CoCauToChuc.Departments_get).subscribe(res=>{
      this.listDepartmentOrigin = res.Data.Data;
      this.listDepartment = this.InitNested(res.Data.Data,null);
      this.tabSelected = this.listDepartment.length > 0 ? this.listDepartment[0] : null;
      if(this.tabSelected){
        this.LoadEmployee();
      }
    })
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

  GetAllChilrend(arr:SidebarModel){
    if(arr.Children.length > 0){
      for (const tab of arr.Children) {
        this.listEmployee.push(tab)
        if(tab.Children.length > 0){
          this.GetAllChilrend(tab);
        }
      }
    }
  }


  LoadEmployee(){
    var item = this.listDepartmentOrigin.find(x => x.DepartmentCode == this.tabSelected.DepartmentCode);
    var lst = this.InitNested(this.listDepartmentOrigin,item.DepartmentCode);
    this.listEmployee = [item,...lst]
    // this._api.post(AppAPIConst.CoCauToChuc.Employees_get,{
    //   PageIndex:this.PageIndex,
    //   PageSize:this.PageSize,
    //   DepartmentCode:this.tabSelected.DepartmentCode,
    // }).subscribe(res=>{
    //   if(res.Data){
    //     this.listEmployee = res.Data.Data;
    //     this.TotalItems = res.Data.OutputParams.TotalItems
    //     console.log(res,'emps');
    //   }
    // })
  }

  ClickPageEmp(page:any){
    this.PageIndex = page
    this.LoadEmployee();
  }

  onOpenAdd(){
    this.ResetModel();
    this.dialogAdd.show();
  }
  onOpenEdit(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this._languageService.I18LangService.Error.NoRowSelected)
      return;
    }
    this.dialogAdd.show();
  }
  ClickItems(evt:any){
    this.selectedGrid = evt.rowData;
    this.DonViCha = this.listDepartmentOrigin.find(x => x.DepartmentCode == this.selectedGrid.ParentCode);
    this.MaDonVi = this.selectedGrid.DepartmentCode;
    this.TenDonVi = this.selectedGrid.DepartmentName;
  }

  ResetModel(){
    this.selectedGrid = null;
    this.DonViCha = null;
    this.MaDonVi = ''
    this.TenDonVi = '';
    this.PageIndex = AppCommon.PageIndex;
  }

  onDelete(){
    if(!this.selectedGrid && !this.tabSelected){
      this._noti.ShowToastError(this._languageService.I18LangService.Error.NoRowSelected)
      return;
    }
    var DepartmentCode = this.selectedGrid?.DepartmentCode || this.tabSelected?.DepartmentCode
    this._api.post(AppAPIConst.CoCauToChuc.Departments_spdeleteData,{
      strCode:DepartmentCode
    }).subscribe(res=>{
      if(res && res?.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error)
          return;
        }
        this.ResetModel();
        this.getCoCauToChuc();
        this._noti.ShowToastSuccess(this._languageService.I18LangService.Common.Success)
      }
    })
  }
  submitDialog(){
    this._api.post(AppAPIConst.CoCauToChuc.Departments_spPostData,{
        NhomPhuCode:this.MaDonVi,
        NhomPhuName:this.TenDonVi,
        DoiTuong:this.DonViCha?.DepartmentCode
    }).subscribe(res=>{
      if(res && res?.Data){
        if(res?.Data?.Error){
          this._noti.ShowToastError(res?.Data?.Error.Message)
          return;
        }
        this.dialogAdd.hide()
        this.ResetModel();
        this.getCoCauToChuc();
        this._noti.ShowToastSuccess(this._languageService.I18LangService.Common.Success)
      }
    })
  }
}
