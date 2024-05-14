import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BookGroupComponent } from './book-group.component';


const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: BookGroupComponent},
    ]
  },
];

@NgModule({
  declarations: [BookGroupComponent],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class BookGroupModule { }
