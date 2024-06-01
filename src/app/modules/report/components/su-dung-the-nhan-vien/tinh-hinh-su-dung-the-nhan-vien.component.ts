import { Component, HostListener, OnInit } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-tinh-hinh-su-dung-the-nhan-vien',
  templateUrl: './tinh-hinh-su-dung-the-nhan-vien.component.html',
  styleUrls: ['./tinh-hinh-su-dung-the-nhan-vien.component.scss']
})
export class TinhHinhSuDungTheNhanVienComponent implements OnInit {

  height: number = window.innerHeight
  tabSelected: any
  listDepartment: Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmpByUserID;
  PageIndex: number = AppCommon.PageIndex;
  PageSize: number = AppCommon.PageSize;
  TotalItems = 0
  listEmployee: Array<any> = []
  width: number = window.innerWidth - 254 - 300
  tennhom:string;
  Birthday:Date = new Date();
  isShow:boolean = true;

  constructor(private _api: ApiHttpService) { }

  ngOnInit(): void {
    this.getCoCauToChuc();
  }

  ToggleTabs(item: any) {
    // if(item.Children.length == 0){

    // }
    this.tabSelected = item
    console.log(this.tabSelected);
    if (this.tabSelected) {
      this.PageIndex = 0;
      this.TotalItems = 0
      this.LoadEmployee();
    }
  }


  getCoCauToChuc() {
    this._api.post(AppAPIConst.CoCauToChuc.Departments_get).subscribe(res => {
      this.listDepartment = this.InitNested(res.Data.Data, null);
      this.tabSelected = this.listDepartment.length > 0 ? this.listDepartment[0] : null;
      if (this.tabSelected) {
        this.LoadEmployee();
      }
    })
  }

  InitNested(tabs: any[], ParentCode: string | null): any[] {
    const nestedTabs: any[] = [];
    const Empty: any[] = [];
    for (const tab of tabs) {
      if (tab.ParentCode === ParentCode) {
        const nestedTab = { ...tab, Children: Empty };
        nestedTab.Children = this.InitNested(tabs, tab.DepartmentCode);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }
  onHideFilter(){
      this.isShow = !this.isShow;
  }
  // @HostListener('window:click', ['$event.target'])
  // windowScrollEvent(event: MouseEvent) {
        
  // }
  LoadEmployee() {
    this._api.post(AppAPIConst.CoCauToChuc.Employees_get, {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      DepartmentCode: this.tabSelected.DepartmentCode,
    }).subscribe(res => {
      if (res.Data) {
        this.listEmployee = res.Data.Data;
        this.TotalItems = res.Data.OutputParams.TotalItems
        console.log(res, 'emps');
      }
    })
  }

  ClickPageEmp(page: any) {
    this.PageIndex = page
    this.LoadEmployee();
  }

}
