import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { ResponseModel } from 'src/app/shares/models/response';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private _apiHttp:ApiHttpService) { }


  GetNewsFeed(data:any):Observable<ResponseModel>{
    return this._apiHttp.post(AppAPIConst.HOME.GetNewsFeeds,'',{...data},false)
  }

  PostRating(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.PostRating,'',{
      ...data
    },false)
  }

  PostComment(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.PostComment,'',{
      ...data
    },false)
  }

  GetComments(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.GetComments,'',{
      ...data
    },false)
  }

  PostNewsFeeds(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.PostNewsFeeds,'',{
      ...data
    },true)
  }
  EditNewsFeeds(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.EditNewsFeeds,'',{
      ...data
    },true)
  }
  GetVotes(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.GetVotes,'',{
      ...data
    },false)
  }
  VoteRespond(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.VoteRespond,'',{
      ...data
    },false)
  }
  GetVotesRespondWithVotesID(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.GetVotesRespondWithVotesID,'',{
      ...data
    },false)
  }

  DelNewsFeeds(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.DelNewsFeeds,'',{
      ...data
    },true)
  }

  DelComments(data:any){
    return this._apiHttp.post(AppAPIConst.HOME.DelComments,'',{
      ...data
    },false)
  }
}
