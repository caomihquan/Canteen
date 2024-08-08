import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';
import { SideBarService } from 'src/app/shares/services/sidebar/sidebar.service';

@Component({
  selector: 'app-nhom-tai-khoan',
  templateUrl: './nhom-tai-khoan.component.html',
  styleUrls: ['./nhom-tai-khoan.component.scss']
})
export class NhomTaiKhoanComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd:DialogComponent
  height = fnCommon.getGridHeight();
  totalItems: number = 0
  pageIndex = AppCommon.PageIndex;
  pageSize = AppCommon.PageSize
  listNhomTaiKhoan:Array<any> = []
  listNhomTaiKhoanOrigin:Array<any> = []
  VLLNhomTaiKhoan:Array<any> = []
  listNhomTaiKhoanChild:Array<any> = []
  wrapSettings = { wrapMode: 'Content' };
  searchText:string;
  GroupSelected:any;
  width:number = window.innerWidth - 254 - 300
  getPhotoByUserID = fnCommon.ConvertPhotoEmpByUserID;
  ListPermission:Array<any>
  RoleName:string;
  RoleSelected:any;
  Lock = false;
  ID = 0;
  selectedRow:any;
  IsEdit = false;
  FieldsQuery:Array<{
    field:string,
    value:any,
    operator:string
  }>=[];
  QueryFilter:string;
  I18Language:any
  constructor(
    private _api:ApiHttpService,
    private _sidebar:SideBarService,
    private _noti:NotificationService,
    private _lang:LanguageService
  ){
    this.I18Language = this._lang.I18LangService;
  }

  ngOnInit(): void {
    this._sidebar.finishSideBar.subscribe(x =>{
      if(x){
        this._sidebar.breadcrumb.subscribe(res=>{
          if(res){
            this.getNhomTaiKhoan();
            this.ListPermission =  this._sidebar.getPermission()
            this.IsEdit = this.ListPermission.some(x => x.Action == '2');
          }
        })
      }
    })
  }

  ClickPageIndex(page:any){
    this.pageIndex = page;
  }
  ClickRowGrid(evt:any){
    this.selectedRow = evt
  }

  ViewDataFilter(){
    this.pageIndex = 0;
    this.getNhomTaiKhoan();
  }
  actionComplete(args: any) {
    // if(args.action == "filter" && args.type == "actionComplete"){
    //   const data = {
    //     field:args.currentFilterObject.field,
    //     value:args.currentFilterObject.value,
    //     operator:args.currentFilterObject.operator
    //   }
    //   if(this.FieldsQuery.some(x => x.field == data.field)){
    //     this.FieldsQuery = this.FieldsQuery.filter(x => x.field != data.field)
    //     this.FieldsQuery.push(data)
    //   }
    //   else{
    //     this.FieldsQuery.push(data)
    //   }
    //   this.QueryFilter = fnCommon.HandlerFillter(this.FieldsQuery);
    //   this.ViewDataFilter();
    // }
    // else if(args.action == "clearFilter" && args.type == "actionComplete"){
    //   const field = args.currentFilterColumn.field
    //   if(this.FieldsQuery.some(x => x.field == field)){
    //     this.FieldsQuery = this.FieldsQuery.filter(x => x.field != field)
    //     this.QueryFilter = fnCommon.HandlerFillter(this.FieldsQuery);
    //     this.ViewDataFilter();
    //   }
    // }
  }

  ClickGroupUser(item:any){
    this.GroupSelected = item
    if(this.GroupSelected){
      this.pageIndex = 0;
      this.totalItems = 0
      this.LoadChildren();
    }
  }
  LoadChildren(){
    var item = this.listNhomTaiKhoanOrigin.find(x => x.RoleID == this.GroupSelected.RoleID);
    var lst = this.InitNested(this.listNhomTaiKhoanOrigin,item.RoleID);
    lst = [item,...lst]
    this.listNhomTaiKhoanChild = lst
    console.log(this.listNhomTaiKhoan);
  }

  InitNested(tabs: any[], ParentCode: string | null): any[] {
    const nestedTabs: any[] = [];
    const Empty: any[] = [];
  for (const tab of tabs) {
      if (tab.ParentRoleID === ParentCode) {
        const nestedTab = { ...tab, Children:Empty};
        nestedTab.Children = this.InitNested(tabs, tab.RoleID);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }

  getNhomTaiKhoan(){
    this._api.post(AppAPIConst.ACCOUNT.UserRole_getData).subscribe(res=>{
      this.listNhomTaiKhoanOrigin = res.Data.tblRole
      this.VLLNhomTaiKhoan = [{
        RoleID:null,
        RoleName:''
      },...this.listNhomTaiKhoanOrigin]

      this.listNhomTaiKhoan = this.InitNested(this.listNhomTaiKhoanOrigin,null);
      this.GroupSelected = this.listNhomTaiKhoan.length > 0 ? this.listNhomTaiKhoan[0] : null;
      if(this.GroupSelected){
        this.LoadChildren();
      }
    })
  }

  AddNhom(){
    this.RoleName = '';
    this.RoleSelected = this.GroupSelected;
    this.dialogAdd.show();
  }
  EditNhom(item:any){
    this.RoleName = item.RoleName
    this.RoleSelected = this.VLLNhomTaiKhoan.find(x=> x.RoleID == item.ParentRoleID)
    this.Lock = item.Lock
    this.ID = item.ID
    this.dialogAdd.show();
  }
  SubmitDialog(){
    this._api.post(AppAPIConst.ACCOUNT.Danhmucpost,{
      Name:this.RoleName,
      Parent:this.RoleSelected.RoleID ?? null,
      ID: this.ID?? 0,
      Lock:this.Lock,
      Option: "5",
      FeedbackViewRequest:{
        RecID:fnCommon.uuidv4()
      }
    },true).subscribe(res=>{
      if(res && !res.Error){
        if(res.Data.Error){
          this._noti.ShowToastSuccess(res.Data.Error)
          return;
        }
        this.dialogAdd.hide();
        this.RoleName = ''
        this.RoleSelected = null
        this.Lock = false;
        this.ID = 0
        this.pageIndex = 0;
        this.getNhomTaiKhoan();
        this._noti.ShowToastSuccess(this.I18Language.Message.SaveSucess)
      }
    })
  }

  Delete(){
    if(!this.selectedRow){
      this._noti.ShowToastError(this.I18Language.Error.NoRowSelected)
      return;
    }
    this._noti.Confirm({
      title:this.I18Language.Common.Notification,
      content:this.I18Language.Common.WantToDelete,
      textOK:this.I18Language.Common.OK,
      textCancel:this.I18Language.Common.Cancel,
      OkFunction:() => {
        this._api.post(AppAPIConst.ACCOUNT.DeleteUser,{
          Option:5,
          ID:this.selectedRow.RoleID
        },true).subscribe(res=>{
          if(res && !res.Error){
            if(res.Data.Error){
              this._noti.ShowToastSuccess(res.Data.Error)
              return;
            }
            this.pageIndex = 0;
            this.getNhomTaiKhoan();
            this._noti.ShowToastSuccess(this.I18Language.Message.DeleteSucess)
          }
        })
      }
    })
  }
}




