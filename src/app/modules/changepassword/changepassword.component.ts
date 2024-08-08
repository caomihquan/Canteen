import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordService } from './services/change-password.service';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { LanguageService } from 'src/app/shares/services/language/language.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  isShowPasswordOld = false;
  isShowPasswordNew = false;
  isShowPasswordConfirm = false;
  titleModal:string;
  contentModal:string;
  I18nLang:any;
  form = new FormGroup({
    OldPassword: new FormControl('', Validators.required),
    NewPassword: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required),
  });
  constructor(private _serviceChangePassword:ChangePasswordService,
    private _router:Router,
    private _langService:LanguageService,
  ){
    this.I18nLang = this._langService.I18LangService
  }
  ngOnInit(): void {
  }



  onSubmit(){
    this._serviceChangePassword.ChangePassword(this.form.value).subscribe(res=>{
      if(res.Data){
        this._router.navigate([AppRoutes.home])
      }
      else{
        const initialState = {
          title: this.I18nLang.Common.Alert,
          content:this.I18nLang.ChangePassword[res.ErrorCode ?? 'Error'],
        };
        // this.modalRef = this._modalService.show(ModalComponent,{initialState});z
        return;
      }
    })
  }
}
