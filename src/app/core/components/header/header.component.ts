import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ChangePasswordService } from 'src/app/modules/changepassword/services/change-password.service';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { fnCommon } from 'src/app/shares/helpers/common';
import { UserModel } from 'src/app/shares/models/user-model';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showNoti:boolean = false;
  @ViewChild('toggleButton') toggleButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('img') img: ElementRef;
  user:UserModel | null;

  isShowPasswordOld = false;
  isShowPasswordNew = false;
  isShowPasswordConfirm = false;
  modalRef: BsModalRef;
  titleModal:string;
  contentModal:string;
  I18nLang:any;
  form = new FormGroup({
    OldPassword: new FormControl('', Validators.required),
    NewPassword: new FormControl('', Validators.required),
    ConfirmPassword: new FormControl('', Validators.required),
  });
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  listNotification:Array<any> = [];
  TotalItems:number = 0
  TotalPages:number = 0
  constructor(
    private renderer: Renderer2,
    private _router:Router,
    private _user:AuthService,
    private _serviceChangePassword:ChangePasswordService,
    private _langService:LanguageService,
    private _apiHttp:ApiHttpService,
    private _modalService:BsModalService){
    this.renderer.listen('window', 'click',(e:Event) => {
     if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
         if((this.toggleButton.nativeElement as HTMLElement).contains(e.target as HTMLElement) || (this.menu.nativeElement as HTMLElement).contains(e.target as HTMLElement)){
         }
         else{
            this.showNoti = false;
         }
     }
    });
    this.user = this._user.getUser();
    this.getLanguage();
    //this.getNotification();
  }

  fnOnClickNoti(){
    this.showNoti = !this.showNoti
  }

  Logout(){
    localStorage.clear();
    this._router.navigate([AppRoutes.login]);
  }

  getLanguage = async () => {
    this.I18nLang = await this._langService.getLanguage();
  }


  onSubmit(){
    this._serviceChangePassword.ChangePassword(this.form.value).subscribe(res=>{
      debugger
      if(res.Data){
        localStorage.clear();
        this._router.navigate([AppRoutes.login])
      }
      else{
        const initialState = {
          title: this.I18nLang.Common.Alert,
          content:this.I18nLang.ChangePassword[res.ErrorCode ?? 'Error'],
        };
        this.modalRef = this._modalService.show(ModalComponent,{initialState});
        return;
      }
    })
  }

  getNotification(){
    this._apiHttp.post(AppAPIConst.SIDEBAR.Notification,'',{
      PageSize:this.PageSize,
      PageIndex:this.PageIndex
    },false).subscribe(res=>{
      if(!res.Error){
        console.log(res);
        this.listNotification = [...this.listNotification,...res.Data.Data];
        this.TotalItems = res.Data.OutputParams.TotalItems
        this.TotalPages = res.Data.OutputParams.TotalPages
      }
    })
  }

  getPhoto(){
    return fnCommon.ConvertPhotoEmpByUserID(this.user?.UserID ?? '');
  }



}
