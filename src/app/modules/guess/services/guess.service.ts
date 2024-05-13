import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class GuessService {
  constructor(private _apiHttp:ApiHttpService) { }


}
