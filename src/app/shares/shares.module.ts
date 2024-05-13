import { NgModule } from '@angular/core';
import { ControlModule } from './controls.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    ControlModule,CommonModule
  ],
  exports: [
    ControlModule
  ]
})
export class SharesModule { }
