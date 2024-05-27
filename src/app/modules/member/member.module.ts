import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberComponent } from './member.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: MemberComponent},
    ]
  },
];

@NgModule({
  declarations: [
    MemberComponent,
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    ReactiveFormsModule,
    GridViewComponent,
    RouterModule.forChild(routes),
    FlatpickrModule.forRoot()
  ],
})
export class MemberModule { }
