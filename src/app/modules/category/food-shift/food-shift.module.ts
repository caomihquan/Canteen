import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodShiftComponent } from './food-shift.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FoodshiftAddnewDialogComponent } from '../emp-subgroup/dialog/foodshift-addnew-dialog/foodshift-addnew-dialog.component';
import { HistoryModule } from '../emp-subgroup/dialog/history-dialog/history-dialog.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';




const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: FoodShiftComponent},
    ]
  },
];

@NgModule({
  declarations: [
    FoodShiftComponent,
    FoodshiftAddnewDialogComponent
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    DialogModule,
    SwitchModule,
    CheckBoxModule,
    TimePickerModule ,
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
export class FoodShiftModule { }


