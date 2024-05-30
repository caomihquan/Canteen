import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EmpsubgroupComponent } from './empsubgroup.component';
import { HistoryDialogComponent } from '../dialog/history-dialog/history-dialog.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AddnewDialogComponent } from '../dialog/addnew-dialog/addnew-dialog.component';
import { CheckBoxModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { FoodshiftAddnewDialogComponent } from '../dialog/foodshift-addnew-dialog/foodshift-addnew-dialog.component';
import { FoodlineAddnewDialogComponent } from '../dialog/foodline-addnew-dialog/foodline-addnew-dialog.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HistoryModule } from '../dialog/history-dialog/history-dialog.module';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: EmpsubgroupComponent},
    ]
  },
];

@NgModule({
  declarations: [
    EmpsubgroupComponent,
    AddnewDialogComponent,
    // FoodshiftAddnewDialogComponent,
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    DialogModule,
    SwitchModule,
    CheckBoxModule,
    HistoryModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
    InfiniteScrollModule,
    FlatpickrModule.forRoot()
  ],
})
export class EmpsubgroupModule { }
