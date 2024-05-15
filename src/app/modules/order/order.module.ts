import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrderComponent } from './order.component';


const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuard],
    children:[
      {path: '', component: OrderComponent},
      {path: 'order', component: OrderComponent},
    ]
  },
];

@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
    InfiniteScrollModule
  ],
})
export class OrderModule { }
