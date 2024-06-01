import { Component, OnInit, ViewChild } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-angular-buttons';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-tinh-hinh-su-dung-the-khach',
  templateUrl: './tinh-hinh-su-dung-the-khach.component.html',
  styleUrls: ['./tinh-hinh-su-dung-the-khach.component.scss']
})
export class TinhHinhSuDungTheKhachComponent implements OnInit {

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

  FromDate:string = new Date().toISOString();
  ToDate:string = new Date().toISOString();
  selectedCard:any;
  listCombo:Array<any> = []
  constructor(private _api: ApiHttpService) { }
  public toolbarOptions?: ToolbarItems[];
  @ViewChild('grid')  public grid?: GridComponent;
  ngOnInit(): void {
    //this.getCoCauToChuc();
    this.getCombo();
    //this.LoadEmployee();
    this.toolbarOptions = ['ExcelExport'];
  }

  toolbarClick(args: any): void {
    console.log(args);

    if (args.item.id.includes('excelexport')) {
        (this.grid as GridComponent).showSpinner();
        (this.grid as GridComponent).excelExport();
    }
  }

  excelExportComplete(): void {
      (this.grid as GridComponent).hideSpinner();
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

  Export(){
    debugger
    var a = document.querySelector('.e-excelexport') as HTMLElement
    a?.click()
  }

  LoadEmployee() {
    this._api.post(AppAPIConst.Report.reportsudungthe_get, {
      PageIndex: this.PageIndex,
      PageSize:1000000,
      tungay:this.FromDate,
      denngay:this.ToDate,
      Option:8,
      MaThe:this.selectedCard?.MaTheKhach ?? null
    }).subscribe(res => {
      if (res.Data) {
        // this.listEmployee = res.Data.Data;

        this.listEmployee = res.Data.Data.map((x:any)=>{
          return {
            WeekDay:fnCommon.getWeekdayVn(x.ScanTime),
            Date:fnCommon.getDateVN(x.ScanTime),
            Hour:fnCommon.getHour(x.ScanTime),
            ...x}
        });
        this.TotalItems = res.Data.OutputParams.TotalItems
        console.log(res, 'emps');
      }
    })
  }

  ClickPageEmp(page: any) {
    this.PageIndex = page
    this.LoadEmployee();
  }

  getCombo(){
     this._api.post(AppAPIConst.Report.reportsudungthe_getCombo, {

    }).subscribe(res => {
      if (res.Data) {

        this.listCombo = [{
          MaTheKhach:''
        },...res.Data.tblThe]
        console.log(res);

      }
    })
  }

  ViewReport(){
    this.listEmployee = [];
    this.PageIndex = 0;
    this.TotalItems = 0;
    this.LoadEmployee();
  }

}
