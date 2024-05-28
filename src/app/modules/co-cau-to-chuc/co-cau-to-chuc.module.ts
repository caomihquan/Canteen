import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoCauToChucComponent } from './co-cau-to-chuc.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { GridModule } from '@syncfusion/ej2-angular-grids';



@NgModule({
  declarations: [
    CoCauToChucComponent
  ],
  imports: [
    CommonModule,
    GridViewComponent,
    GridModule
  ]
})
export class CoCauToChucModule { }
