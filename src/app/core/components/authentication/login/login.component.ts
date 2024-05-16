import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowPassword = false;
  modalRef: BsModalRef;
  titleModal:string;
  contentModal:string;
  I18nLang:any;
  @ViewChild('template') dialog:TemplateRef<any>
  @ViewChild('changePassword') dlgChangePassword:ElementRef
  form = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });
  constructor(
    private _router: Router,
    private _loginService:LoginService,
    private _AuthService:AuthService,
    private _modalService: BsModalService,
    private _translate:TranslateService,
    private _ordinal:OrdinalService,
    private _languageService:LanguageService
    ){
      _translate.use('en')
  }


  ngOnInit(): void {
    this.getLanguage();
  }

  getLanguage = async() => {
    this.I18nLang = await this._languageService.getLanguage();
  }
  onSubmit(){
    const _loginInfo = this.form.value;
    this._loginService.login(_loginInfo).subscribe(res => {
        if(!res){return;}
        if(res.Error)
        {
          const initialState = {
            title: this.I18nLang.Common.Alert,
            content:res.Error,
          };
          this.modalRef = this._modalService.show(ModalComponent,{initialState});
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
    if (data.IsMaintenance === 1 && userData.NeverExpire === false)
    {
        this.titleModal = this.I18nLang.Common.Alert;
        this.contentModal = this.I18nLang.LoginPage.IsMaintenance;
        this.modalRef = this._modalService.show(this.dialog);
        return;
    }else {
        if (userData.FirstChange) {
          this._router.navigate([AppRoutes.changepassword]);
        } else {
          var xu = 330// Math.floor(Math.random() * (500 - 280 + 1) + 280)
          this._ordinal.setCoin(xu);
          this._router.navigate([AppRoutes.home]);
        }
    }
  }

}
