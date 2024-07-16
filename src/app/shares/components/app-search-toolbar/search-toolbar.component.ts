import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule],
  providers: [
    {
       provide: NG_VALUE_ACCESSOR,
       useExisting: forwardRef(() => AppSearchToolbarComponent),
       multi: true
    },
  ],
})
export class AppSearchToolbarComponent {

  @Output() clickItem:EventEmitter<any> = new EventEmitter();
  textSearch:string;
  constructor(){
  }

  dataOrigin:any[]

  onChange: any = () => {}
  onTouch: any = () => {}

  @Input() value:string;
  @Output() onSearch = new EventEmitter<number>();
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

  onLoadSearch(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
    this.onSearch.emit(newValue);
  }




}
