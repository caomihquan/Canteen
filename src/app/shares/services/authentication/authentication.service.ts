import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../models/user-model';
import { AESCryptoService } from '../aescrypto/aescrypto.service';
import { WebConfig } from 'src/app/core/config/WebConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private key: string = WebConfig.CONSTANT_KEY;
  public userLogin: BehaviorSubject<UserModel | null> =  new BehaviorSubject<UserModel | null>(null);
  FirstChange = false;
  constructor(
    private aesCrypto:AESCryptoService
  ){}

  checkLogin(): Observable<boolean> {
    return new Observable((obs) => {
      let userValue = this.getUser();
      if (userValue == null) {
        return obs.next(false)
      }
      return obs.next(true)
    })
  }

  checkUserStatus() {
    let userValue = this.getUser();
    return userValue != null;
  }


  setUser(user: UserModel) {
    if (user) {
      let us = JSON.stringify(user);
      us = this.aesCrypto.encode(us);
      this.userLogin.next(user);
      localStorage.setItem(this.key, us);
    }
  }

  getUser(): UserModel | null {
    if (!this.key) return null;
    try {
      let sUs = localStorage.getItem(this.key);
      if (!sUs) { return null; }
      sUs = this.aesCrypto.decode(sUs);
      return JSON.parse(sUs);
    } catch (error) {
      return null;
    }
  }

  removeUser() {
    localStorage.removeItem(this.key);
    this.userLogin.next(null);
  }

  SetLanguage(lang:string){
    if(lang)
      localStorage.setItem('Language', lang);
    else
    localStorage.setItem('Language', 'vn');
  }
  getLanguage(){
      if(localStorage.getItem('Language')){
        return localStorage.getItem('Language')
      }
      else
        return 'vn';
  }
}
