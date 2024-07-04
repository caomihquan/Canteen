import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogAllModule, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { fnCommon } from '../../helpers/common';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,DialogAllModule,TooltipModule],
})
export class TreeViewComponent implements OnInit {

  @Input() title:string = '';
  @Input() fieldName:string = '';
  @Input() fieldName2:string = '';
  @Input() dataSource:any;
  @Input() selectedItem:any;
  @Input() searchField:Array<string> = [];
  @Input() showSeach = false;
  @Input() hideTitle = false;
  @Input() disabled = false;
  @Input() IsRequire = false;

  @Output() clickItem:EventEmitter<any> = new EventEmitter();

  textSearch:string;
  height = window.innerHeight - 300
  dataOrigin:any[] = []
  id = fnCommon.uuidv4();
  ngOnInit(): void {
    console.log(this.dataSource);

  }
  ChangeSearch(){
    if(this.dataOrigin.length === 0){
      this.dataOrigin = this.dataSource;
    }
    if (!this.textSearch) {
      this.dataSource = this.dataOrigin
      return;
    }
    if(this.searchField.length > 0){
      var data = JSON.parse(JSON.stringify(this.dataOrigin))
      var dataFilters = [];
      for (var j = 0; j < this.searchField.length; j++) {
          for (var i = 0; i < data.length; i++) {
              if (data[i][this.searchField[j]] && data[i][this.searchField[j]].toLowerCase().indexOf(this.textSearch.toLowerCase()) !== -1 && dataFilters.indexOf(data[i]) == -1) {
                  dataFilters.push(data[i]);
              }
          }
      }
      this.dataSource = dataFilters
    }
  }
}
