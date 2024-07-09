import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DialogAllModule, DialogComponent, TooltipModule } from '@syncfusion/ej2-angular-popups';
import { fnCommon } from '../../helpers/common';
import { PagerModule } from '@syncfusion/ej2-angular-grids';
import { AppCommon } from '../../constants/AppCommon';

@Component({
  selector: 'app-combobox',
  templateUrl: './app-combobox.component.html',
  styleUrls: ['./app-combobox.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,DialogAllModule,TooltipModule,PagerModule],

})
export class AppComboboxComponent  {
  @ViewChild('dialogCombobox') dialogCombobox:DialogComponent
  @Input() title:string = '';
  @Input() fieldName:string = '';
  @Input() fieldName2:string = '';
  @Input() dataSource:any;
  @Input() selectedItem:any;
  @Input() searchField:Array<string> = [];
  @Input() showSeachDropDown = false;
  @Input() hideTitle = false;
  @Input() disabled = false;
  @Input() IsRequire = false;
  @Input() pageIndex:number = 1;
  @Input() totalItems:number = 0;
  @Input() pageSize:number = AppCommon.PageSize
  @Input() IsPaging = false;
  @Input() IsMultiSelect = false;

  @Output() clickItem:EventEmitter<any> = new EventEmitter();
  @Output() clickPage:EventEmitter<any> = new EventEmitter();
  @Output() searchEvent:EventEmitter<any> = new EventEmitter();


  textSearch:string;
  height = window.innerHeight - 300
  dataOrigin:any[] = []
  id = fnCommon.uuidv4();
  listSelected:Array<any> = []
  isCheckAll:boolean = false;
  constructor(){}

  onBeforeOpen = function(args: any): void {
    args.maxHeight = `${window.innerHeight}px`;
    args.top = `0`;
  }

  ClickPager(page:any){
    if (page && page != 0) {
      this.clickPage.emit(page - 1);
    }
  }

  ChangeSearch(){
    if(this.dataOrigin.length === 0){
      this.dataOrigin = this.dataSource.map((x:any) =>{
        x['IsChecked'] = false;
        return x
      });
    }
    if (!this.textSearch) {
      this.dataSource = JSON.parse(JSON.stringify(this.dataOrigin))
      return;
    }
    if(this.searchField.length > 0){
      var data = JSON.parse(JSON.stringify(this.dataOrigin))
      console.log(data);
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

  EnterSearch(){
    this.searchEvent.emit(this.textSearch)
  }

  eventClickItem(item:any){
    if(this.dataOrigin.length === 0){
      this.dataOrigin = JSON.parse(JSON.stringify(this.dataSource.map((x:any) =>{
        x['IsChecked'] = false;
        return x
      })));
    }
    if(!this.IsMultiSelect){
      this.dialogCombobox.hide();
      this.clickItem.emit(item)
    }
    else{
      item['IsChecked'] = !item['IsChecked']
      this.dataOrigin.map((x:any) =>{
        if(x[this.fieldName2] == item[this.fieldName2]){

          x.IsChecked = !x.IsChecked;
        }
        return x
      })
    }
  }
  eventClickXoa(){
    this.dialogCombobox.hide();
    this.clickItem.emit([])
    this.dataSource.map((x:any) =>{
      if(x?.IsChecked){
        x.IsChecked = false;
      }
      return x
    })
    this.dataOrigin.map((x:any) =>{
      if(x?.IsChecked){
        x.IsChecked = false;
      }
      return x
    })
  }

  eventFilter(){
    var data = this.dataOrigin.filter((x:any) => x?.IsChecked)
    this.clickItem.emit(data)
    this.dialogCombobox.hide();
  }

  eventCheckAll(){
    this.isCheckAll = !this.isCheckAll
    if(this.isCheckAll){
      this.dataSource.map((x:any) =>{
        x.IsChecked = true;
        return x
      })
      this.dataOrigin.map((x:any) =>{
        x.IsChecked = true;
        return x
      })
    }
    else{
      this.dataSource.map((x:any) =>{
        x.IsChecked = false;
        return x
      })
      this.dataOrigin.map((x:any) =>{
        x.IsChecked = false;
        return x
      })
    }
  }
}
