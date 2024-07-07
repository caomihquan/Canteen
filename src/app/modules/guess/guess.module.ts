import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from './danh-sach-the-khach/guess.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { CapPhatTheKhachComponent } from './cap-phat-the-khach/cap-phat-the-khach.component';
import { TheoDoiLichSuThanhToanComponent } from './theo-doi-lich-su-thanh-toan/theo-doi-lich-su-thanh-toan.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';


const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: 'danh-sach-the-khach', component: GuessComponent},
      {path: 'cap-phat-the-khach', component: CapPhatTheKhachComponent},
      {path: 'theo-doi-lich-su-thanh-toan', component: TheoDoiLichSuThanhToanComponent},
    ]
  },
];

@NgModule({
  declarations: [GuessComponent, CapPhatTheKhachComponent, TheoDoiLichSuThanhToanComponent],
  imports: [
    CommonModule,
    SharesModule,
    DialogModule,
    FormsModule,
    AppDialogComponent,
    BreadcumComponent,
    AppComboboxComponent,
    AppInputComponent,
    AppDateTimeComponent,
    RouterModule.forChild(routes),
    GridViewComponent,
  ],
})
export class GuessModule { }
