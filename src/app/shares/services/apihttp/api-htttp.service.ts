import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebConfig } from 'src/app/core/config/WebConfig';
import { AuthService } from '../authentication/authentication.service';
import { ResponseModel } from '../../models/response';
import { Router } from '@angular/router';
import { AppRoutes } from '../../constants/AppRoutes';
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  Lang = {};
  constructor(
    private http: HttpClient,
    private auth:AuthService,
    private route:Router
  ) {}

  post(url:string, funcID?:string, datas?:any,loading:boolean = false) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    const _headers:{ [key: string]: any } = {
      "HRM-Api-Url": url,
      "HRM-Function-ID": funcID,
      "HRM-Request-Url": "HrmMobileApp",
      "HRM-Api-Type": "HrmMobileApp",
      "HRM-Application-ID": "HrmMobileApp",
      "Loading":loading
    };
    const loginInfo = this.auth.getUser();
    if (loginInfo) {
      _headers["HRM-Session-ID"] = loginInfo.SessionID;
      _headers["HRM-Token-ID"] = loginInfo.TokenID;
      _headers["HRM-JWT-ID"] = loginInfo.Jwt;
    }
    let _payload = datas;
    let urlencoded = "headers=" + window.encodeURIComponent(JSON.stringify(_headers));
    if (_payload) {
      urlencoded += "&payload=" + window.encodeURIComponent(JSON.stringify(_payload));
    }

    return this.http.post<any>(WebConfig.strUrl + 'ApiHandler/Call', urlencoded, { headers: headers })
    .pipe(map((res:ResponseModel) => {
      if (res && !res.ErrorCode && !res.ErrorLogin && !res.Error) {
        res.Data = JSON.parse(res?.Data)
        return res;
      }
      else{
        const error = res ? res.ErrorCode || res.ErrorLogin || res.Error : "Error";
        //const objError = this.CommonHandler.GetErrorMessage(error);
        this.HandleAuthorization(res)
        return res;
        //res.Error = objError.message;
        //this.InitValidateAlert(objError);
      }

    }),catchError(err => {

      return of();
    }));
  }

  private HandleAuthorization(res:ResponseModel){
    if(res.Error && res.Error.includes('Not Authorization')){
      this.route.navigate([AppRoutes.notAuthor])
    }
    if(res.Error && res.Error.includes('405')){
      localStorage.clear();
      this.route.navigate([AppRoutes.login])
    }
  }
  // async InitValidateAlert(error){
  //   const Lang = await this.languageService.getLanguage();
  //   const { message, isTranslate } = error;
  //   if (typeof message === 'string' && (message.includes("405 (Method Not Allowed)") || message.includes('Session ID of user not logged in'))){
  //     this.authStore.remove();
  //     localStorage.clear();
  //     this.router.navigate(['']);
  //     return;
  //   }
  //   if (isTranslate) {
  //     this.notification.alert(Lang['COMMON'].Error,message);
  //   }
  // }
}
