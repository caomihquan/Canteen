import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-listmaster',
  templateUrl: './listmaster.component.html',
  styleUrls: ['./listmaster.component.scss']
})
export class ListMasterComponent {
  @Input() template: TemplateRef<any>;
  @Input() templateField: TemplateRef<any>;
  @Input() tableData: Array<any>[];
  @Input() pageSize = 20; // Number of items to display per page
  @Output() selectedRow = new EventEmitter()
  currentPage = 1; // Current page number
  @Output() indexTable = new EventEmitter();
  @Input() isActive = -1;

  get totalPages(): number {
    return Math.ceil(this.tableData.length / this.pageSize);
  }
  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  ClickRow(item:any,index:number){
    this.indexTable.emit(index);
    this.selectedRow.emit(item)
  }
}
