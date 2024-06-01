import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-combobox',
  templateUrl: './app-combobox.component.html',
  styleUrls: ['./app-combobox.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,DialogAllModule],

})
export class AppComboboxComponent  {

  @Input() title:string = '';
  @Input() fieldName:string = '';
  @Input() fieldName2:string = '';
  @Input() dataSource:any;
  @Input() selectedItem:any;
  @Input() searchField:Array<string> = [];
  @Input() showSeachDropDown = false;
  @Input() disabled = false;
  @Output() clickItem:EventEmitter<any> = new EventEmitter();

  textSearch:string;
  height = window.innerHeight - 300
  dataOrigin:any[] = []

  constructor(){
      this.dataSource = [
          {month:'1'}, 
          {month:'1'},
          {month:'1'},
          {month:'1'},
          {month:'1'}
      ]
  }
  
  onBeforeOpen = function(args: any): void {
    debugger;
    args.maxHeight = `${window.innerHeight}px`;
    args.top = `0`;
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
