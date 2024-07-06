import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import {  SettingComponent } from './setting.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {path: '', component: SettingComponent},
      {path: 'emp-subgroup', loadChildren: () => import('./category/empsubgroup/empsubgroup.module').then(m => m.EmpsubgroupModule)},
      {path: 'food-shift', loadChildren: () => import('./category/food-shift/food-shift.module').then(m => m.FoodShiftModule)},
      {path: 'food-line', loadChildren: () => import('./category/foodline/foodline.module').then(m => m.FoodLineModule)},
    ]
  },
];

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class SettingModule { }
