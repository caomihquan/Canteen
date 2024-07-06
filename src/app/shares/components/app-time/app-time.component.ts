import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-time',
  templateUrl: './app-time.component.html',
  styleUrls: ['./app-time.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,TimePickerModule],

})
export class AppTimeComponent {
  @Input() title:string = '';
  @Input() value:any;
  @Input() disabled = false;
  @Input() IsRequire = false;
  @Output() clickTime:EventEmitter<any> = new EventEmitter();


  public formatString: string = 'HH:mm';
  public interval: number = 60;
  constructor(){}
  ChangeDate(evt:any){
    this.value = evt.text;
    this.clickTime.emit(evt.text)
  }




}
