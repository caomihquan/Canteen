import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './core/components/app-routing.module';
import { AppComponent } from './core/components/app.component';
import { SharesModule } from './shares/shares.module';
import { CoreModule } from './core/components/core.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeModule } from './modules/home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AuthService } from './shares/services/authentication/authentication.service';
import { AppConfigService } from './shares/services/app-config/app-config.service';
import { FoodshiftAddnewDialogComponent } from './modules/category/emp-subgroup/dialog/foodshift-addnew-dialog/foodshift-addnew-dialog.component';

import { LayoutComponent } from './core/components/layout/layout.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/', '.json');
}

function appInitializer(authService: AuthService, config: AppConfigService) {
  return () => new Promise((resolve) => {
      config.init().subscribe(() => {
        authService.checkLogin().subscribe((v) => {
          resolve(v);
        });
      });
    });
}
@NgModule({
  declarations: [
    AppComponent,LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HomeModule,
    SharesModule,
    NgIdleKeepaliveModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'vn'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, AppConfigService],
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
