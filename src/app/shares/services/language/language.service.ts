import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  Lang = new Subject<any>();
  constructor(
    private translate: TranslateService) {
  }
  getLocale(){
    return localStorage.getItem('Language') ?? 'vn';
  }
  getLanguage():Promise<any>{
    return new Promise((resolve, reject) => {
      const lang = this.getLocale();
      this.translate.getTranslation(lang).subscribe(x => resolve(x));
    })
  }
}
