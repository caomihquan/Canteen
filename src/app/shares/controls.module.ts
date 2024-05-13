import { NgModule, Type } from '@angular/core';
import { TabelComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { ScrollInfiniteDirective } from './directive/scroll-infinite.directive';

import { ListMasterComponent } from './components/listmaster/listmaster.component';
import { PagerModule } from '@syncfusion/ej2-angular-grids';
import { GridModule, PageService, SortService } from '@syncfusion/ej2-angular-grids';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
const COMPONENT: Type<any>[] = [
  TabelComponent,ModalComponent,DateAgoPipe,ScrollInfiniteDirective, ListMasterComponent
];
const MODULES: Type<any>[] = [
  CommonModule,FormsModule,GridModule,PagerModule,TooltipModule

];
@NgModule({
  declarations: [
    COMPONENT
  ],
  imports: [...MODULES,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
  ],
  exports:[
    ...MODULES,...COMPONENT
  ],
  providers:[SortService,PageService]
})
export class ControlModule { }
