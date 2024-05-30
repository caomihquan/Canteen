import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { FlatpickrModule } from 'angularx-flatpickr';
import {  SettingComponent } from './setting.component';
import { EmpsubgroupComponent } from '../category/emp-subgroup/empsubgroup/empsubgroup.component';


const routes: Routes = [
  {
    path:'',
    //canActivate: [AuthGuard],
    children:[
      {path: '', component: SettingComponent},
      {path: 'emp-subgroup', loadChildren: () => import('../category/emp-subgroup/empsubgroup/empsubgroup.module').then(m => m.EmpsubgroupModule)},
      {path: 'food-shift', loadChildren: () => import('../category/food-shift/food-shift.module').then(m => m.FoodShiftModule)},
      {path: 'food-line', loadChildren: () => import('../category/foodline/foodline.module').then(m => m.FoodLineModule)},
    ]
  },
];

@NgModule({
  declarations: [SettingComponent

  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    // FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   },
    //   defaultLanguage: 'vn'
    // }),
  ],
})
export class SettingModule { }
