import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './app-dropdown.component.html',
  styleUrls: ['./app-dropdown.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule],

})
export class AppDropdownComponent {

  @Input() title:string = '';
  @Input() fieldName:string = '';
  @Input() dataSource:any;
  @Input() selectedItem:any;
  @Input() searchField:Array<string> = [];
  @Input() showSeachDropDown = false;
  @Input() disabled = false;
  @Output() clickItem:EventEmitter<any> = new EventEmitter();

  textSearch:string;
  constructor(){
    this.dataOrigin = this.dataSource;
  }
  dataOrigin:any[]


  ChangeSearch(){
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
