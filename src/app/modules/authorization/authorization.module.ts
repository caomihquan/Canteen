import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhomTaiKhoanComponent } from './nhom-tai-khoan/nhom-tai-khoan.component';
import { SharesModule } from 'src/app/shares/shares.module';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule } from '@angular/forms';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { AppDateTimeComponent } from 'src/app/shares/components/app-datetime/app-datetime.component';
import { AppSearchToolbarComponent } from 'src/app/shares/components/app-search-toolbar/search-toolbar.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { RouterModule, Routes } from '@angular/router';
import { TreeViewComponent } from 'src/app/shares/components/tree-view/tree-view.component';
import { GroupAccountComponent } from './phan-quyen/group-account.component';

const routes: Routes = [
  {
    path:'roles',
    component:NhomTaiKhoanComponent
  },
  {
    path:'userroles',
    component:GroupAccountComponent
  },
];

@NgModule({
  declarations: [NhomTaiKhoanComponent,GroupAccountComponent],
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
    AppSearchToolbarComponent,
    GridViewComponent,
    TreeViewComponent,
    RouterModule.forChild(routes),
  ]
})
export class AuthorizationModule { }
