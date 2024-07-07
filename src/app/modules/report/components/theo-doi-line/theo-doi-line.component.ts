import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-theo-doi-line',
  templateUrl: './theo-doi-line.component.html',
  styleUrls: ['./theo-doi-line.component.scss']
})
export class TheoDoiLineComponent implements OnInit {

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
  selectedDowCode:any
  LineReportModel:any = {

  }
  dataLine:Object[] = [
      // {
      //   line:'A',
      //   vendor:'SSSS',
      //   month:'7',
      //   totalXu: 30000
      // },
      // {
      //   line:'A',
      //   vendor:'SSSS',
      //   month:'7',
      //   totalXu: 30000
      // },
      // {
      //   line:'A',
      //   vendor:'SSSS',
      //   month:'7',
      //   totalXu: 30000
      // }
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

  LoadDowCode() {
    this._api.post(AppAPIConst.Report.reportsudungthe_getCombo, {
      // PageIndex: this.PageIndex,
      // PageSize: this.PageSize,
      // DowCode: this.Filter.DowCode,
      // SearchText: '',
      // Option: 1
    }).subscribe(res => {
      if (res.Data) {
        debugger;
        this.DowCode = res.Data.tblDowCode;
        if(this.DowCode && this.DowCode.length > 0){
          this.selectedDowCode =  this.DowCode[0];
        }
        console.log(res, 'emps');
      }
    })
  }
 LoadLineReport() {
    this._api.post(AppAPIConst.Report.ReportTongHop, {
      PageIndex: this.PageIndex,
      PageSize: this.PageSize,
      DowCode: this.selectedDowCode?.DowCode,
      SearchText: this.selectedDowCode?.DowCode,
      Option: 1
    }).subscribe(res => {
      if (res.Data) {
        this.dataLine = res.Data.Data;
        this.TotalItems = res.Data.OutputParams.TotalItems
        console.log(res, 'emps');
      }
    })
  }
  ClickPageEmp(page: any) {
    this.PageIndex = page
   // this.LoadEmployee();
  }
  onChangeDowCode(event:any ){
    this.selectedDowCode = event;
  }
  onApplyFilter(){

  }
}
