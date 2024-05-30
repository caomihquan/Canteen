import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebConfig } from 'src/app/core/config/WebConfig';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(private _apiHttp:ApiHttpService) { }


  ChangePassword(loginInfo:any):Observable<ResponseModel>{
    const data = {
      OldPassword:btoa(loginInfo.OldPassword),
      NewPassword:btoa(loginInfo.NewPassword),
      ConfirmPassword:btoa(loginInfo.ConfirmPassword)
    }
    return this._apiHttp.post(AppAPIConst.CHANGEPASSWORD.ChangePassword,{...data})
  }
}
