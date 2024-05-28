import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class MemberService{

  constructor(private _apiHttp:ApiHttpService) { }

  InitUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };
  InitUnion1(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},false)
  };
  GetUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };
  PostUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };
  PutUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };
  DelUnion(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };

  GetDetailUnion(data:any){
    return this._apiHttp.post(AppAPIConst.Feedback.Feedback_get,'',{...data},true)
  };
  XuatLopHoc(data:any){
    return this._apiHttp.post("HrmMobileApp/CnB/Feedback/XuatLopHoc",'',{...data},true)
  };
  ImportData(data:any){
    return this._apiHttp.post("HrmMobileApp/CnB/table/post",'',{...data},true)
  };
  Export(data:any){
    return this._apiHttp.post("HrmMobileApp/CnB/Export/XuatLopHoc",'',{...data},true)
  };
}
