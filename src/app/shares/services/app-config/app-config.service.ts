import { Injectable } from '@angular/core';
import {  map } from 'rxjs';
import { AppConfig } from '../../models/AppConfig';
import { HttpClient } from '@angular/common/http';
import { WebConfig } from 'src/app/core/config/WebConfig';
import { Meta } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService extends  AppConfig {
  constructor(private http: HttpClient,private meta:Meta) {
    super();
  }
  getLocale(){
    return localStorage.getItem('Language') ?? 'vn';
  }
  init() {
    return this.http.get<AppConfig>('assets/configs/hjka.json').pipe(map(res => {
      WebConfig.strUrl = res.strUrl;
      console.log(res.IdleTime);

      WebConfig.IdleTime = res.IdleTime;
      if(res.ContentPolicy){
        let tag = this.meta.getTag('http-equiv=Content-Security-Policy');
        if(tag){
          this.meta.addTags(res.ContentPolicy)
        }
      }
    }));
  }
}
