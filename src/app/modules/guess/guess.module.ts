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
import { GuessComponent } from './danh-sach-the-khach/guess.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { CapPhatTheKhachComponent } from './cap-phat-the-khach/cap-phat-the-khach.component';
import { TheoDoiLichSuThanhToanComponent } from './theo-doi-lich-su-thanh-toan/theo-doi-lich-su-thanh-toan.component';


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
    FormsModule,
    FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
    GridViewComponent,
  ],
})
export class GuessModule { }
