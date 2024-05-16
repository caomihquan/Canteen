import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ErrorComponent } from './error/error.component';
import { NotAuthorComponent } from './notAuthorization/notAuthorization.component';
const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'food',
    loadChildren: () => import('./../../modules/food/food.module').then(m => m.FoodModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./../../modules/order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./../../modules/changepassword/changepassword.module').then(m => m.ChangepasswordModule)
  },
  {
    path: 'guess',
    loadChildren: () => import('./../../modules/guess/guess.module').then(m => m.GuessModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./../../modules/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./../../modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'menu-employee',
    loadChildren: () => import('./../../modules/menu-employee/menu-employee.module').then(m => m.MenuEmployeeModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./../../modules/member/member.module').then(m => m.MemberModule)
  },
  {
    path: 'book-group',
    loadChildren: () => import('./../../modules/book-group/book-group.module').then(m => m.BookGroupModule)
  },
  {
    path: 'notAuthor',
    component:NotAuthorComponent
  },
  {
    path: '',
    loadChildren: () => import('./../../modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
