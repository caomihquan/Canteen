import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { fnCommon } from '../../helpers/common';

@Component({
  selector: 'app-datetime',
  templateUrl: './app-datetime.component.html',
  styleUrls: ['./app-datetime.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,DateTimePickerModule],

})
export class AppDateTimeComponent {

  @Input() title:string = '';
  @Input() value:any;
  @Input() disabled = false;

  @Output() clickDate:EventEmitter<any> = new EventEmitter();
  constructor(){}
  ChangeDate(evt:any){
    const date = evt.value as Date
    const day = date.getDate();
    let month:string | number = date.getMonth() + 1;
    if(month < 10){
      month = "0" + month
    }
    const year = date.getFullYear();
    this.clickDate.emit(fnCommon.convertDateSQL(`${day}-${month}-${year}`))
    console.log(fnCommon.convertDateSQL(`${day}-${month}-${year}`));
  }




}
