import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class GuessService {
  constructor(private _apiHttp:ApiHttpService) { }

  TheKhach_Get(pageIndex:number,searchText:string,pageSize:number):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.TheKhach.TheKhach_get,'',{SearchText:searchText, PageIndex:pageIndex,PageSize:pageSize},true)
  }

  TheKhach_GetHistoryTK(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.TheKhach.TheKhach_get,'',{...data},true)
  }

}
