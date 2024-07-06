import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { EmpsubgroupComponent } from './empsubgroup.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { AppSwitchComponent } from 'src/app/shares/components/app-switch/app-switch.component';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';

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
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    DialogModule,
    SwitchModule,
    AppInputComponent,
    AppComboboxComponent,
    GridViewComponent,
    AppSwitchComponent,
    AppDialogComponent,
    HistoryDialogComponent,
    BreadcumComponent,
    RouterModule.forChild(routes),
  ],
})
export class EmpsubgroupModule { }
