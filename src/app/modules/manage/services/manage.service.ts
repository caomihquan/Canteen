import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private _apiHttp:ApiHttpService) { }

  InitUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get ,{...data},false)
  };
  GetUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get, {...data},false)
  };
  PostUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get ,{...data},true)
  };
  PutUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get ,{...data},true)
  };
  DelUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get ,{...data},true)
  };

  GetDetailUnion(data:any){
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get ,{...data},false)
  };

}
