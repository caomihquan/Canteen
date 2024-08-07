import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  Lang = new Subject<any>();
  currentLang:string = ''
  I18LangService:any;
  constructor(
    private translate: TranslateService,
  ) {
  }
  getLocale(){
    var lang = localStorage.getItem('Language') ?? 'vn';
    localStorage.setItem('Language',lang);
    this.currentLang = lang;
    return lang;
  }
  getLanguage():Promise<any>{
    return new Promise((resolve, reject) => {
      const lang = this.getLocale();
      console.log(lang);

      this.translate.getTranslation(lang).subscribe(x => resolve(x));
    })
  }
}
