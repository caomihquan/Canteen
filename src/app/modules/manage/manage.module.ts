import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './manage.component';
import { FlatpickrModule } from 'angularx-flatpickr';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: ManageComponent},
    ]
  },
];

@NgModule({
  declarations: [
    ManageComponent,
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    RouterModule.forChild(routes),
    FlatpickrModule.forRoot()
  ],
})
export class ManageModule { }
