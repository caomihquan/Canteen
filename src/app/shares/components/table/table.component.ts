import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TabelComponent {
  @Input() template: TemplateRef<any>;
  @Input() templateField: TemplateRef<any>;
  @Input() tableData: Array<any>[];
  @Input() pageSize = 20; // Number of items to display per page
  @Output() selectedRow = new EventEmitter()
  currentPage = 1; // Current page number
  @Output() indexTable = new EventEmitter();
  @Input() isActive = -1;
  @Input() totalPages:number

  get fntotalPages(): number {
    if(this.totalPages){
      return this.totalPages;
    }
    return Math.ceil(this.tableData.length / this.pageSize);
  }
  get pages(): number[] {
    return Array(this.fntotalPages).fill(0).map((x, i) => i + 1);
  }

  ClickRow(item:any,index:number){
    this.indexTable.emit(index);
    this.selectedRow.emit(item)
  }
}
