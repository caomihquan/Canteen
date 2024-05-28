import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { MemberComponent } from './member/member.component';
import { CapPhatDinhMucComponent } from './cap-phat-dinh-muc/cap-phat-dinh-muc.component';
import { AppDropdownComponent } from 'src/app/shares/components/app-dropdown/app-dropdown.component';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { TheoDoiLichSuThanhToanComponent } from './theo-doi-lich-su-thanh-toan/theo-doi-lich-su-thanh-toan.component';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {
        path: '', component: MemberComponent
      },
      {
        path: 'cap-phat-dinh-muc', component: CapPhatDinhMucComponent
      },
      {
        path: 'theo-doi-lich-su-thanh-toan', component: TheoDoiLichSuThanhToanComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    MemberComponent,
    CapPhatDinhMucComponent,
    TheoDoiLichSuThanhToanComponent
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    ReactiveFormsModule,
    GridViewComponent,
    AppDropdownComponent,
    AppDateTimeComponent,
    DialogAllModule,
    RouterModule.forChild(routes),
    FlatpickrModule.forRoot()
  ],
})
export class AccountModule { }
