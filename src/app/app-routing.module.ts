import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/authentication/login/login.component';
import { ErrorComponent } from './core/components/error/error.component';
import { NotAuthorComponent } from './core/components/notAuthorization/notAuthorization.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guard/auth.guard';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    canActivate:[AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'guess',
        loadChildren: () => import('./modules/guess/guess.module').then(m => m.GuessModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'co-cau-to-chuc',
        loadChildren: () => import('./modules/co-cau-to-chuc/co-cau-to-chuc.module').then(m => m.CoCauToChucModule)
      },
      {
        path: 'system',
        loadChildren: () => import('./modules/authorization/authorization.module').then(m => m.AuthorizationModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'co-cau-to-chuc'
      }
    ]
  },
  {
    path: 'history-emp',
    canActivate:[AuthGuard],
    loadChildren: () => import('./modules/history-emp/history-emp.module').then(m => m.HistoryEmpModule)
  },
  {
    path: 'scan',
    canActivate:[AuthGuard],
    loadChildren: () => import('./modules/scan/scan.module').then(m => m.ScanModule)
  },
  {
    path: 'notAuthor',
    component: NotAuthorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
