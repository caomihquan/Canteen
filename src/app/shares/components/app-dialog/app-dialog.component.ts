import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fnCommon } from '../../helpers/common';
import { DialogAllModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss'],
  standalone:true,
  imports:[FormsModule,CommonModule,DialogAllModule],
})
export class AppDialogComponent {
  @Input() headerText:string = '';
  @Input() templateBody:TemplateRef<any>;
  @Input() position:any = { X: 'center', Y: 'center' };
  @Input() height:number | string = 500
  @Input() width:number | string = '585px';
  @Input() isFooter:boolean = true;
  @ViewChild('dialog') dialog:DialogComponent;


  @Output() submit = new EventEmitter<any>();
  constructor(){
  }

  submitDialog(){
    this.submit.emit();
  }

  show(){
    this.dialog.show();
  }
}
