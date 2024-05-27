import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

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





}
