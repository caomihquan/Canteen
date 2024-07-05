import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { WebConfig } from 'src/app/core/config/WebConfig';
import { AuthService } from '../authentication/authentication.service';
import { ResponseModel } from '../../models/response';
import { Router } from '@angular/router';
import { AppRoutes } from '../../constants/AppRoutes';
import { NotificationService } from '../notification/notification.service';
import { SideBarService } from '../sidebar/sidebar.service';
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  Lang = {};
  constructor(
    private http: HttpClient,
    private auth:AuthService,
    private route:Router,
    private noti:NotificationService,
    private sidebar:SideBarService
  ) {}

  post(url:string, datas?:any,loading:boolean = false) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    const _headers:{ [key: string]: any } = {
      "HRM-Api-Url": url,
      "HRM-Function-ID": null,
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
    let _payload = {...datas,FunctionID:this.sidebar.FunctionID};
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
        this.HandleErroService(error)
        return res;
      }
    }),catchError(err => {

      return of();
    }));
  }

  private HandleErroService(errorMsg:any){
    if(errorMsg && errorMsg.includes('Not Authorization')){
      this.route.navigate([AppRoutes.notAuthor])
    }
    else if(errorMsg?.toString().includes("405 (Method Not Allowed)") || errorMsg?.toString().includes('Session ID of user not logged in')){
      this.noti.ShowToastError("Phiên đăng nhập đã hết hạn")
      setTimeout(() => {
        localStorage.clear();
        this.route.navigate([AppRoutes.login]);
      }, 2000);
    }
    else{
      this.noti.ShowToastError(errorMsg)
    }
  }
}
