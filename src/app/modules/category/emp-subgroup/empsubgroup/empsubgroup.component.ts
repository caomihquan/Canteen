import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/modules/manage/services/manage.service';
import { MenuService } from 'src/app/modules/menu/services/menu.service';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { UserModel } from 'src/app/shares/models/user-model';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { HistoryDialogComponent } from '../dialog/history-dialog/history-dialog.component';
import { AddnewDialogComponent } from '../dialog/addnew-dialog/addnew-dialog.component';
import { FoodshiftAddnewDialogComponent } from '../dialog/foodshift-addnew-dialog/foodshift-addnew-dialog.component';
import { FoodlineAddnewDialogComponent } from '../dialog/foodline-addnew-dialog/foodline-addnew-dialog.component';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';

@Component({
  selector: 'app-empsubgroup',
  templateUrl: './empsubgroup.component.html',
  styleUrls: ['./empsubgroup.component.scss']
})
export class EmpsubgroupComponent implements OnInit {
  @ViewChild('historydialog') historydialog: HistoryDialogComponent
  @ViewChild('addnewdialog') addnewdialog: AddnewDialogComponent
  @ViewChild('addnewfoodshiftdialog') addnewfoodshiftdialog: FoodshiftAddnewDialogComponent
  @ViewChild('addnewfoodlinedialog') addnewfoodlinedialog: FoodlineAddnewDialogComponent
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  width:number = (window.innerWidth - 250)
  searchText:string;
  selectedMenu:any;
  loginInfo: any = {};
  modalRef: BsModalRef
  I18nLang:any
  defaultColor = AppCommon.defaultColor


  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup:Array<any> = []



  selectedTab = 1
  constructor(
    private _userService:AuthService,
    private _api:ApiHttpService
    ){
      this.loginInfo = this._userService.getUser();
  }
  ngOnInit() {
   
  }



  getListFoodLine(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:1,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      console.log(res);
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.totalItems

    })
  }




  AddMenu(){
      //  this.addnewdialog.onOpenDialog();
       // this.addnewfoodshiftdialog.onOpenDialog();
        this.addnewfoodlinedialog.onOpenDialog();
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedMenu = item;
  }

  onClickViewHistory(id:number){
    this.historydialog.onOpenDialog();
  }

  
  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
    }
  }

  ResetModel(){
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }

  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

 
}
