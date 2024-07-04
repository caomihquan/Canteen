import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OnlyNumberDirective } from '../../directive/only-number.directive';
import { fnCommon } from '../../helpers/common';

@Component({
  selector: 'app-switch',
  templateUrl: './app-switch.component.html',
  styleUrls: ['./app-switch.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule],

})
export class AppSwitchComponent {
  @Input() title:string = '';
  @Input() disabled = false;
  @Output() changeSwitch:EventEmitter<any> = new EventEmitter();
  @Input() value:boolean;
  @Input() IsRequire = false;
  id = fnCommon.uuidv4();
  constructor(){
  }

  ChangeInput(){
    console.log(!this.value);
    this.changeSwitch.emit(!this.value)
  }
}
