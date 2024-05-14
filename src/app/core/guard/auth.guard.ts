import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
//import { UserService } from 'src/app/shares/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _userService: AuthService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this._userService
      .checkLogin()
      .pipe(
        tap((authenticated:boolean) => this.handleAuth(authenticated, state))
        )
  }

  private handleAuth(isAuthenticated: boolean, state: RouterStateSnapshot) {

    if (!isAuthenticated) {
      this.router.navigate([AppRoutes.login],{
        queryParams: { returnUrl: state.url },
      });
    }
    if(isAuthenticated && this._userService.getUser()?.FirstChange && !this._userService.FirstChange){
      this._userService.FirstChange = true;
      this.router.navigate([AppRoutes.changepassword])
    }
    // else if(this._userService.getUser()?.FirstChange){
    //   this.router.navigate([AppRoutes.changepassword])
    // }
  }

  private hadnAuthor(isAuthor: boolean, state: RouterStateSnapshot){
    if (!isAuthor) {
      this.router.navigate([AppRoutes.login],{
        queryParams: { returnUrl: state.url },
      });
    }
  }

}
