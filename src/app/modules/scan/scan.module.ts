import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './scan.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule } from '@angular/forms';
import { OnlyNumberDirective } from 'src/app/shares/directive/only-number.directive';


const routes: Routes = [
  {path: '', component: ScanComponent},
];


@NgModule({
  declarations: [
    ScanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    OnlyNumberDirective,
    RouterModule.forChild(routes),
  ]
})
export class ScanModule { }
