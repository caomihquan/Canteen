import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-theo-doi-nhan-vien',
  templateUrl: './theo-doi-nhan-vien.component.html',
  styleUrls: ['./theo-doi-nhan-vien.component.scss']
})
export class TheoDoiNhanVienComponent implements OnInit {

  @ViewChild('grid')  public grid?: GridComponent;
  height: number = window.innerHeight
  tabSelected: any
  listDepartment: Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmpByUserID;
  PageIndex: number = AppCommon.PageIndex;
  PageSize: number = AppCommon.PageSize;
  TotalItems = 0
  lisline: Array<any> = []
  width: number = window.innerWidth - 254 - 300
  tennhom:string;
  Birthday:Date = new Date();
  isShow:boolean = true;
  public toolbarOptions?: ToolbarItems[];
  DowCode: string[] = [];
  Filter: any = {
    DowCode: ''
  }
  LineReportModel:any = {

  }
  dataLine:Object[] = [
   
  ]


  constructor(private _api: ApiHttpService) { }

  ngOnInit(): void {
    //this.getCoCauToChuc();
   // this.TotalItems = this.dataLine.length;
      this.LoadDowCode();
      
      this.toolbarOptions = ['ExcelExport'];
  }
  toolbarClick(args: any): void {
    console.log(args);

    if (args.item.id.includes('excelexport')) {
        (this.grid as GridComponent).showSpinner();
        (this.grid as GridComponent).excelExport();
    }
  }
  Export(){
    var a = document.querySelector('.e-excelexport') as HTMLElement
    a?.click()
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
     // this.LoadEmployee();
    }
  }


  
  onHideFilter(){
      this.isShow = !this.isShow;
  }
 
  LoadDowCode(callback?:any) {
    this._api.post(AppAPIConst.Report.reportsudungthe_getCombo, {
      // PageIndex: this.PageIndex,
      // PageSize: this.PageSize,
      // DowCode: this.Filter.DowCode,
      // SearchText: '',
      // Option: 0
    }).subscribe(res => {
      if (res.Data) {
        debugger;
        this.DowCode = res.Data.tblDowCode;
        if(this.DowCode && this.DowCode.length > 0){
          this.Filter.DowCode =  this.DowCode[0];
          this.LoadLineReport()
        }
        console.log(res, 'emps');
      }
    })
  }
 LoadLineReport(Filter?:string) {
    this._api.post(AppAPIConst.Report.ReportTongHop, {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      DowCode: this.Filter.DowCode.DowCode,
      SearchText: Filter ? Filter : '',
      Option: 0
    }).subscribe(res => {
      if (res.Data) {
        debugger;
        this.dataLine = res.Data.Data;
        this.TotalItems = res.Data.OutputParams.TotalItems
        console.log(res, 'emps');
      }
    })
  }
  ClickPageEmp(page: any) {
    this.PageIndex = page
    this.LoadLineReport();
  }
  onChangeDowCode(event:any ){
      if(event){
        this.Filter.DowCode = event;
      }
  }

}
