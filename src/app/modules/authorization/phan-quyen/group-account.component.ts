import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AppComboboxComponent } from 'src/app/shares/components/app-combobox/app-combobox.component';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { UserModel } from 'src/app/shares/models/user-model';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';
import { SideBarService } from 'src/app/shares/services/sidebar/sidebar.service';
//PHÂN QUYỀN
@Component({
  selector: 'app-group-account',
  templateUrl: './group-account.component.html',
  styleUrls: ['./group-account.component.scss']
})
export class GroupAccountComponent implements OnInit {
  @ViewChild('dialogAdd') dialogAdd: DialogComponent;
  @ViewChild('cbb') cbb: AppComboboxComponent;
  @ViewChild('dialogPhanCong') dialogPhanCong: DialogComponent;
  @ViewChild('dialogAddFieldGroup') dialogAddFieldGroup: DialogComponent;
  @ViewChild('dialogAddProvince') dialogAddProvince: DialogComponent;
  listUserRole:Array<any> = []
  listUserRoleOrigin:Array<any> = []
  tabSelected:any;
  height = window.innerHeight - 126;
  PageIndex = AppCommon.PageIndex;
  PageSize = AppCommon.PageSize;
  listUser:Array<any>=[]
  selectedTabRight = signal(1);
  ListGroupPerssion:Array<any> = []
  selectedGroup:any
  SearchText:any;
  ListFunctionPemission:Array<any> = []
  ListPermission:Array<any>=[]
  ListPermissionData:Array<any>=[]
  RoleSelected:any;
  RoleName:any;
  //public filterOptions?: FilterSettingsModel = AppCommon.FilterSetting as FilterSettingsModel;
  FieldsQuery:Array<{
    field:string,
    value:any,
    operator:string
  }>=[];
  QueryFilter:string;

  FieldsQueryProvince:Array<{
    field:string,
    value:any,
    operator:string
  }>=[];
  QueryFilterProvince:string;

  VLLUserRole:any[];
  VLLProvince:any[];
  ProvinceSelected:any;

  Email:any;
  CbbUser:any[];
  selectedUser:any;
  rowGridSelected:any
  totalItem:number = 0;
  lstSelectedUser:any[];

  mtHeader:number = 16;


  tblProvince:Array<any> = [];

  tblFieldGroupCode:Array<any> = []
  tblUserFieldGroup:Array<any> = []

  selectedFieldGroupUser:any;
  lstProvinceInField:Array<any> = []
  lstProvinceSelected:Array<any> = []

  dlgSelectedFieldGroup:any;
  PageIndexProvince = AppCommon.PageIndex;
  PageSizeProvince = AppCommon.PageSize;

  selectedProvinceDlg:any;
  lstselectedProvinceDlg:Array<any> = []
  totalItemProvince:any;
  isHideAction = false;
  user:UserModel | null;
  I18Language:any;
  constructor(
    private _Api:ApiHttpService,
    private _noti:NotificationService,
    private _sidebar:SideBarService,
    private _auth:AuthService,
    private _lang:LanguageService
  ){
    this.user = this._auth.getUser();
    this.I18Language = this._lang.I18LangService;
  }

  ngOnInit(): void {
    this._sidebar.finishSideBar.subscribe(res=>{
      if(res){
        this._sidebar.breadcrumb.subscribe(res=>{
          if(res){
            this.ListPermission =  this._sidebar.getPermission()
          }
        })
        this.getUserRole();
        this.getVLLUserRole();
      }
    })
  }

  scrollEvent(evt:any){
    if(evt.target.scrollTop >= 16){
      this.mtHeader = 0;
      return;
    }

    this.mtHeader = evt.target.scrollTop + 16
  }
  onBeforeOpen = function(args: any): void {
    args.maxHeight = `${window.innerHeight}px`;
    args.top = `0`;
  }
  InitNested(tabs: any[], ParentGroup: number | null): any[] {
    const nestedTabs: any[] = [];
    const Empty: any[] = [];
    for (const tab of tabs) {
      if (tab.ParentRoleID === ParentGroup) {
        const nestedTab = { ...tab, Children:Empty};
        nestedTab.Children = this.InitNested(tabs, tab.RoleID);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }
  ViewDataFilter(){
    this.PageIndex = 0;
    this.getDataWithRoleID()
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

  getVLLUserRole(){
    this._Api.post(AppAPIConst.ACCOUNT.tblUser_getData,{},true).subscribe(res=>{
      if(res && !res.Error){
        this.VLLProvince = res.Data.tblProvince
        this.VLLUserRole = res.Data.tblRole
        this.CbbUser = res.Data.tblUser
      }
    })
  }


  CheckHideAction(){
    this._Api.post(AppAPIConst.ACCOUNT.tblUserRoleProvice_spGetPhanQuyen,{
      UserID:this.user?.UserID,
      RoleID:this.tabSelected?.RoleID
    }).subscribe(res=>{
      if(res && !res.Error){
       this.isHideAction = res.Data.tblPhanQuyen[0].IsNotEdit
      }
    })
  }

  ToggleTabs(item:any){
    this.tabSelected = item
    this.CheckHideAction();
    if(this.selectedTabRight() == 1){
      this.ResetList()
      this.getDataWithRoleID()
    }
    else{
      this.getPermission();
    }
  }

  ClickTabChild(item:any){
    this.tabSelected = item;
    if(this.selectedTabRight() == 1){
      this.ResetList()
      this.getDataWithRoleID()
    }
    else{
      this.getPermission();
    }
  }

  ClickTabRight(tab:number){
    this.selectedTabRight.set(tab);
    if(tab == 1){
      this.ResetList()
      this.getDataWithRoleID()
    }
    else{
      this.getPermission()
    }
  }

  ResetList(){
    this.PageIndex = AppCommon.PageIndex
    this.PageSize = AppCommon.PageSize
    this.listUser = [];
  }

  CheckListFunction(GroupPemissionID:any){
    return this.ListFunctionPemission.filter(x =>x.GroupID == GroupPemissionID);
  }

  CheckListPermission(Action:any){
    return this.ListPermissionData.filter(x =>Action.split(',').includes(x.Value));
  }


  getUserRole(refesh:boolean = true){
    this._Api.post(AppAPIConst.ACCOUNT.UserRole_getData,{}).subscribe(res=>{
      if(res && !res.Error){
        this.listUserRole = this.InitNested(res.Data.tblRole,null)
        this.listUserRoleOrigin = [{
          RoleID:null,
          RoleName:''
        },...res.Data.tblRole]
        if(refesh){
          this.ToggleTabs(this.listUserRole[0])
        }
      }
    })
  }

  getDataWithRoleID(){
    this._Api.post(AppAPIConst.ACCOUNT.UserRole_getDataWithRoleID,{
      RoleID:this.tabSelected.RoleID,
      PageSize:this.PageSize,
      PageIndex:this.PageIndex,
      Expression:'' //this.QueryFilter ? fnCommon.toBinary(this.QueryFilter.slice(0, -5)) : '',
    }).subscribe(res=>{
      if(res && !res.Error){
        this.listUser = res.Data.Data;
        this.totalItem = res.Data.OutputParams.TotalItems
      }
    })
  }

  ClickPage(page:number){
    this.PageIndex = page;
    this.getDataWithRoleID();
  }

  getPhoto(userid:any){
    return fnCommon.ConvertPhotoEmpByUserID(userid);
  }


  getPermission(){
    this._Api.post(AppAPIConst.ACCOUNT.Permission_getdata,{
      RoleID:this.tabSelected.RoleID
    }).subscribe(res=>{
      console.log(res);
      if(res && !res.Error){
        var listGroup = res.Data.tblPermission.map((x:any) => {
          return {
            GroupID:x.GroupID,
            GroupName:x.GroupName
          }
        })
        const arrayUniqueByKey = [...new Map(listGroup.map((item:any) =>
        [item["GroupID"], item])).values()];
        this.ListGroupPerssion = arrayUniqueByKey.filter((x:any) => !!x.GroupID)
        this.selectedGroup = this.ListGroupPerssion[0]
        this.ListFunctionPemission = res.Data.tblPermission
        this.ListPermissionData = res.Data.tblAction.filter((x:any) => x.Value != 0);

      }
    })
  }


  ReturnChecked(func:any,PermissionID:any){
    var key =`A${PermissionID}`;
    return func[key]
  }

  ChangeCheckedPermission(functionID:any,PermissionID:any){
    var index = this.ListFunctionPemission.findIndex(x =>x.FunctionID == functionID)
    if(index != -1){
      this.ListFunctionPemission[index][`A${PermissionID}`] = !this.ListFunctionPemission[index][`A${PermissionID}`]
    }
  }

  SavePermission(){
    this._Api.post(AppAPIConst.ACCOUNT.PostDataUser,{
      Option:3,
      DataPermission:this.ListFunctionPemission
    }).subscribe(res=>{
      if(res && !res.Error){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error)
          return;
        }
        this._noti.ShowToastSuccess('Lưu thành công')

      }
    })
  }

  //dùng cái này để submit nhóm người dùng
  SubmitAddUserToGroup(){
    if(this.Email && !fnCommon.validateEmail(this.Email)){
      this._noti.ShowToastError('Email chưa đúng dịnh dạng')
      return;
    }
    const data = {
      UserID:this.lstSelectedUser.map(x => x?.UserID ?? '').join(';'),
      RecID:this.lstSelectedUser.map(x => x?.RecID ?? '').join(';'),
      RoleID:this.RoleSelected?.RoleID
    }
    this._Api.post(AppAPIConst.ACCOUNT.PostDataUser,{
      DataUserRole:data,
      Option:2
    }).subscribe(res=>{
      if(res && !res.Error){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error)
          return;
        }
        this.dialogAdd.hide();
        this.rowGridSelected = null;
        this.PageIndex = 0;
        if(this.selectedTabRight() == 1){
          this.ResetList()
          this.getDataWithRoleID()
        }
        else{
          this.getPermission();
        }
        this._noti.ShowToastSuccess('Lưu thành công')
      }
    })
  }

  DeleteToolbarLeft(){
    this._noti.Confirm({
      title:'Thông báo',
      content:'Bạn có chắc chắn muốn xoá?',
      textOK:'Đồng ý',
      textCancel:'Huỷ bỏ',
      OkFunction:() => {
        this._Api.post(AppAPIConst.ACCOUNT.DeleteUser,{
          Option:5,
          ID:this.tabSelected.RoleID
        }).subscribe(res=>{
          if(res && !res.Error){
            if(res.Data.Error){
              this._noti.ShowToastError(res.Data.Error)
              return;
            }
            this.getUserRole();
            this._noti.ShowToastSuccess('Xoá thành công')

          }
        })
      }
    })
  }

  closeDialogAddRole(){
    this.dialogAdd.hide();
  }



  ClickUserRole(item:any){
    this.RoleSelected = item
  }

  OpenDialogRole(type?:number){
    this.lstSelectedUser = []
    this.selectedUser = ''
    this.RoleSelected = {
      RoleID:this.tabSelected?.RoleID,
      RoleName:this.tabSelected?.RoleName
    }
    this.dialogAdd.show();
  }

  ClickProvince(item:any){
    this.ProvinceSelected = item
  }

  SelectUser(item:any){
    this.lstSelectedUser = item
    this.selectedUser = this.lstSelectedUser.map(x => x?.UserName ?? '').join(';')
  }


  DeleteUser(){
    if(!this.rowGridSelected){
      this._noti.ShowToastError(this.I18Language.Error.NoRowSelected)
      return;
    }
    this._noti.Confirm({
      title:this.I18Language.Common.Notification,
      content:this.I18Language.Common.WantToDelete,
      textOK:this.I18Language.Common.OK,
      textCancel:this.I18Language.Common.Cancel,
      OkFunction:()=>{
        this._Api.post(AppAPIConst.ACCOUNT.DeleteUser,{
          Option:11,
          ID:this.rowGridSelected.RecID
        }).subscribe(res=>{
          if(res && !res.Error){
            if(res.Data.Error){
              this._noti.ShowToastError(res.Data.Error)
              return;
            }
            this.rowGridSelected = null;
            this.PageIndex = 0;
            if(this.selectedTabRight() == 1){
              this.ResetList()
              this.getDataWithRoleID()
            }
            else{
              this.getPermission();
            }
            this._noti.ShowToastSuccess('Xoá thành công')

          }
        })
      }
    })
  }

  RowGridClick(evt:any){
    this.rowGridSelected = evt.rowData;
    const row = evt.row;
    fnCommon.preventLoseGridFocus(row)
  }



  RowSelected(event:any,type?:number){
    if(event.isHeaderCheckboxClicked){
      if(event.name == "rowDeselected"){
        this.lstProvinceSelected = event.data;
        return;
      }
      else{
        this.lstProvinceSelected = event.data;
        return;
      }
    }
    else{
      if(type == 1){
        this.lstProvinceSelected = this.lstProvinceSelected.filter(x => x["ProvinceCode"] != event.data["ProvinceCode"])
      }
      else{
        this.lstProvinceSelected = this.lstProvinceSelected.filter(x => x["ProvinceCode"] != event.data["ProvinceCode"])
        this.lstProvinceSelected.push(event.data);
      }
    }
  }


}
