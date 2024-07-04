import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { NotAuthorComponent } from './notAuthorization/notAuthorization.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    ErrorComponent,
    NotAuthorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GridModule,
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
    HeaderComponent,
    SidebarComponent,
    LoginComponent
  ]
})
export class CoreModule { }
