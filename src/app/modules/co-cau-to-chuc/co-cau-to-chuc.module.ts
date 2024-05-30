import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoCauToChucComponent } from './co-cau-to-chuc.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: '', component: CoCauToChucComponent},
    ]
  },
];

@NgModule({
  declarations: [
    CoCauToChucComponent
  ],
  imports: [
    CommonModule,
    GridViewComponent,
    GridModule,
    RouterModule.forChild(routes),
  ]
})
export class CoCauToChucModule { }
