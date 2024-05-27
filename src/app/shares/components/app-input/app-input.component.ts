import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnlyNumberDirective } from '../../directive/only-number.directive';

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,OnlyNumberDirective],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => AppInputComponent),
       multi: true
    },
  ],
})
export class AppInputComponent {

  @Input() title:string = '';
  @Input() type:string = 'text';
  @Input() disabled = false;
  @Input() rows:number = 3;
  @Output() clickItem:EventEmitter<any> = new EventEmitter();
  textSearch:string;
  constructor(){
  }

  dataOrigin:any[]

  onChange: any = () => {}
  onTouch: any = () => {}

  @Input() value:string;
  @Output() valueChange = new EventEmitter<number>();
  // onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }




}
