import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { HistoryDialogComponent } from './history-dialog.component';



// const routes: Routes = [
//   {
//     path:'',
//     canActivate: [AuthGuard],
//     children:[
//       {path: '', component: FoodShiftComponent},
//     ]
//   },
// ];
var component:any = [
  HistoryDialogComponent
]
@NgModule({
  declarations: [
    component
  ],
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    DialogModule,
    SwitchModule,
    // RouterModule.forChild(routes),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   },
    //   defaultLanguage: 'vn'
    // }),
    // InfiniteScrollModule
  ],
  exports:[
    component
  ]
})
export class HistoryModule { }
