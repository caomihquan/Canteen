import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { HistoryModule } from '../emp-subgroup/dialog/history-dialog/history-dialog.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FoodlineComponent } from './foodline.component';
import { FoodlineAddnewDialogComponent } from '../emp-subgroup/dialog/foodline-addnew-dialog/foodline-addnew-dialog.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';




const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: FoodlineComponent},
    ]
  },
];

@NgModule({
  declarations: [
      FoodlineComponent,
      FoodlineAddnewDialogComponent
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    DialogModule,
    SwitchModule,
    CheckBoxModule,
    GridViewComponent,
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
export class FoodLineModule { }


