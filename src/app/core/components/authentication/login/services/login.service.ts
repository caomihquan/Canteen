import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebConfig } from 'src/app/core/config/WebConfig';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _apiHttp:ApiHttpService) { }


  login(loginInfo:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.LOGIN.Login,'',{...loginInfo},true)
  }
}
