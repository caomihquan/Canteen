import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
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
  searchText:string;
  selectedMenu:any;
  loginInfo: any = {};
  I18nLang:any

  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  listSubgroup:Array<any> = []



  constructor(
    private _userService:AuthService,
    private _api:ApiHttpService
    ){
      this.loginInfo = this._userService.getUser();
  }
  ngOnInit() {
    this.getListFoodLine();
  }


  getListFoodLine(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      Option:1,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
    }).subscribe(res=>{
      this.listSubgroup = res.Data.Data
      this.totalItems = res.Data.OutputParams.totalItems
    })
  }




  onAdd(){
    this.addnewfoodlinedialog.onOpenDialog();
  }

  selectedRowTable(evt:any){
    const item = evt.rowData
    this.selectedMenu = item;
  }

  onClickViewHistory(id:string){
    this.historydialog.onOpenDialog(id);
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
