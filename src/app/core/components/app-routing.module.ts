import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ErrorComponent } from './error/error.component';
import { NotAuthorComponent } from './notAuthorization/notAuthorization.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../guard/auth.guard';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    canActivate:[AuthGuard],
    component: LayoutComponent,
    children: [
      // {
      //   path: 'food',
      //   loadChildren: () => import('./../../modules/food/food.module').then(m => m.FoodModule)
      // },
      // {
      //   path: 'order',
      //   loadChildren: () => import('./../../modules/order/order.module').then(m => m.OrderModule)
      // },
      // {
      //   path: 'changepassword',
      //   loadChildren: () => import('./../../modules/changepassword/changepassword.module').then(m => m.ChangepasswordModule)
      // },
      {
        path: 'guess',
        loadChildren: () => import('./../../modules/guess/guess.module').then(m => m.GuessModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./../../modules/report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./../../modules/setting/setting.module').then(m => m.SettingModule)
      },
      // {
      //   path: 'menu',
      //   loadChildren: () => import('./../../modules/menu/menu.module').then(m => m.MenuModule)
      // },
      // {
      //   path: 'menu-employee',
      //   loadChildren: () => import('./../../modules/menu-employee/menu-employee.module').then(m => m.MenuEmployeeModule)
      // },
      {
        path: 'account',
        loadChildren: () => import('./../../modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'co-cau-to-chuc',
        loadChildren: () => import('./../../modules/co-cau-to-chuc/co-cau-to-chuc.module').then(m => m.CoCauToChucModule)
      },

      {
        path: '',
        loadChildren: () => import('./../../modules/co-cau-to-chuc/co-cau-to-chuc.module').then(m => m.CoCauToChucModule)
      },
      // {
      //   path: 'book-group',
      //   loadChildren: () => import('./../../modules/book-group/book-group.module').then(m => m.BookGroupModule)
      // },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'history-emp',
    canActivate:[AuthGuard],
    loadChildren: () => import('./../../modules/history-emp/history-emp.module').then(m => m.HistoryEmpModule)
  },
  {
    path: 'scan',
    canActivate:[AuthGuard],
    loadChildren: () => import('./../../modules/scan/scan.module').then(m => m.ScanModule)
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
