import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryEmpComponent } from './history-emp.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { GridViewComponent } from 'src/app/shares/components/grid-view/grid-view';
import { RouterModule, Routes } from '@angular/router';
import { WeekdayVnPipe } from 'src/app/shares/pipes/weekday.pipe';
import { CoreModule } from 'src/app/core/components/core.module';
import { AppDropdownComponent } from 'src/app/shares/components/app-dropdown/app-dropdown.component';

const routes: Routes = [
  {
    path: '', component: HistoryEmpComponent
  },
];


@NgModule({
  declarations: [
    HistoryEmpComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    WeekdayVnPipe,
    GridViewComponent,
    CoreModule,
    AppDropdownComponent,
    RouterModule.forChild(routes)
  ]
})
export class HistoryEmpModule { }
