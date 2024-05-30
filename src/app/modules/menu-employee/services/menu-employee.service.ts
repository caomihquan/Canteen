import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private _apiHttp:ApiHttpService) { }


  GetRules(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.News.tintucGetData {...data},true)
  }
  PostRules(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.News.tintucPost {...data},true)
  }
  DelRules(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.News.tintucDel {...data},true)
  }

  getDetailRules(data:any){
    return this._apiHttp.post(AppAPIConst.News.tintucDetail {...data},false)
  }
  getAttachment(data: any){
    return this._apiHttp.post('HrmMobileApp/CnB/QuestionAndAnswer/tintucGetDataWithID' {...data},false)
  }

  CheckUploadExtensions(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.SYSTEM.CheckUploadFile {...data},false)
  }
}
