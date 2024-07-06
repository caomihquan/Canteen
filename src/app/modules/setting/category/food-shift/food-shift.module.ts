import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodShiftComponent } from './food-shift.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';
import { AppTimeComponent } from 'src/app/shares/components/app-time/app-time.component';




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
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    GridViewComponent,
    AppInputComponent,
    AppTimeComponent,
    AppDialogComponent,
    BreadcumComponent,
    RouterModule.forChild(routes),
  ],
})
export class FoodShiftModule { }


