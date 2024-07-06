import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { FoodlineComponent } from './foodline.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';




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
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    GridViewComponent,
    AppDialogComponent,
    AppInputComponent,
    AppComboboxComponent,
    AppDateTimeComponent,
    HistoryDialogComponent,
    BreadcumComponent,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
  ],
})
export class FoodLineModule { }


