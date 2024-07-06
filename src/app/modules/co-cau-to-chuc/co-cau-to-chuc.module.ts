import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoCauToChucComponent } from './co-cau-to-chuc.component';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RouterModule, Routes } from '@angular/router';
import { AppInputComponent } from 'src/app/shares/components/app-input/app-input.component';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { TreeViewComponent } from 'src/app/shares/components/tree-view/tree-view.component';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { BreadcumComponent } from 'src/app/shares/components/breadcum/breadcum.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path: '', component: CoCauToChucComponent},
    ]
  },
];

@NgModule({
  declarations: [
    CoCauToChucComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridViewComponent,
    GridModule,
    AppInputComponent,
    DialogAllModule,
    TreeViewComponent,
    BreadcumComponent,
    RouterModule.forChild(routes),
  ]
})
export class CoCauToChucModule { }
