import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowPassword = false;
  @ViewChild('template') dialog:TemplateRef<any>
  @ViewChild('changePassword') dlgChangePassword:ElementRef
  form = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });
  I18Lang:any
  constructor(
    private _router: Router,
    private _loginService:LoginService,
    private _AuthService:AuthService,
    private _noti:NotificationService,
    private _languageService:LanguageService
    ){
      this.I18Lang = this._languageService.I18LangService;
      if(!this.I18Lang){
        this.getLanguage();
      }
  }


  ngOnInit(): void {

  }

  getLanguage = async() =>{
    this._languageService.I18LangService = await this._languageService.getLanguage();
    this.I18Lang = this._languageService.I18LangService;
  }


  onSubmit(){
    const _loginInfo = this.form.value;
    this._loginService.login(_loginInfo).subscribe(res => {
        if(!res){return;}
        if(res.Error)
        {
          this._noti.ShowToastError(res.Error)
          return;
        }
        const data = res?.Data;
        const user = data?.Data;
        //user.FirstChange = true;
        this.handleLogin(data);
        this._AuthService.setUser(user);
    });
  }



  handleLogin(data:any) {
    const userData = data.Data || {};
    if (data.IsMaintenance === 1 && !userData.NeverExpire)
    {
        this._noti.ShowToastError(this.I18Lang.LoginPage.IsMaintenance)
        return;
    }else {
        if (userData.FirstChange) {
          this._router.navigate([AppRoutes.changepassword]);
        } else {
          this._router.navigate([AppRoutes.home]);
        }
    }
  }

}
