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


const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: GuessComponent},
    ]
  },
];

@NgModule({
  declarations: [GuessComponent],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
  ],
})
export class GuessModule { }
