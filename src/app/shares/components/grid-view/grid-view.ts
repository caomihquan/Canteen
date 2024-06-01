import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ExcelExportService, FilterService, FilterSettingsModel, Grid, GridModule, GroupService, PageService, PageSettingsModel, PagerModule, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'grid-view',
  templateUrl: './grid-view.html',
  styleUrls: ['./grid-view.scss'],
  imports: [GridModule,CommonModule,PagerModule],
  providers: [PageService,SortService,FilterService,GroupService, ExcelExportService, ToolbarService],
  standalone: true,
})
export class GridViewComponent{

  @Input() template: TemplateRef<any>;
  @Input() dataSource:any;
  @Input() configField:any[] = [];
  @Input() totalItems:number;
  @Input() pageSize:number = 20;
  @Input() pageIndex:number;
  @Input() isFilter:boolean = false;
  @Input() height:number = (window.innerHeight - 220)

  @Output() clickPage = new EventEmitter<number>()
  public filterOptions?: FilterSettingsModel;

  public pageSettings?: PageSettingsModel = {
    pageSize:this.pageSize
  };
  ClickPager(event:any){
    if(event?.currentPage){
      this.clickPage.emit(event?.currentPage - 1)
    }
  }

  actionBegin(args: any) {
    if(args.requestType == 'filtering'){
      args.cancel=true;
    }

  }

  actionComplete(args: any) {
    if(args.requestType == 'filtering'){
      args.cancel = true;
      if(args.action == 'filter'){
        console.log(args.currentFilterObject,'filter');
      }
      else{
        console.log(args.currentFilterObject,'clear');
      }
    }
  }
}
