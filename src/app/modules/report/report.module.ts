import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule, Routes } from '@angular/router';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { TinhHinhSuDungTheNhanVienComponent } from './components/su-dung-the-nhan-vien/tinh-hinh-su-dung-the-nhan-vien.component';
import { TinhHinhSuDungTheKhachComponent } from './components/su-dung-the-khach/tinh-hinh-su-dung-the-khach.component';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { ExcelExportService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';
import { TheoDoiLineComponent } from './components/theo-doi-line/theo-doi-line.component';
import { TheoDoiNhanVienComponent } from './components/thong-ke-dinh-muc/theo-doi-nhan-vien.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'tinh-hinh-su-dung-the-nhanvien', component: TinhHinhSuDungTheNhanVienComponent },
      { path: 'tinh-hinh-su-dung-the-khach', component: TinhHinhSuDungTheKhachComponent },
      { path: 'theo-doi-line', component: TheoDoiLineComponent },
      { path: 'theo-doi-nhan-vien', component: TheoDoiNhanVienComponent },
    ]
  },
];

@NgModule({
  declarations: [
    TinhHinhSuDungTheNhanVienComponent,
    TinhHinhSuDungTheKhachComponent,
    TheoDoiLineComponent,
    TheoDoiNhanVienComponent
  ],
  imports: [
    CommonModule,
    SharesModule,
    DialogModule,
    FormsModule,
    AppComboboxComponent,
    FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
    GridViewComponent,
    AppDateTimeComponent,
    FlatpickrModule.forRoot()
  ],
  providers:[ExcelExportService, ToolbarService]
})
export class ReportModule { }
