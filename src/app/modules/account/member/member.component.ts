import { Component, Renderer2,OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shares/models/user-model';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { ExportCommonService } from 'src/app/shares/services/export/export.service';
import { SideBarService } from 'src/app/shares/services/sidebar/sidebar.service';
import { ImportService } from 'src/app/shares/services/import/import.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @ViewChild('dialogHistory') dialogHistory:AppDialogComponent
  @ViewChild('empaddnewdialog') empaddnewdialog:AppDialogComponent
  selectedDate:any;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  PageIndexHistory:number = AppCommon.PageIndex;
  PageSizeHistory:number = AppCommon.PageSize;
  height:number = (window.innerHeight - 202)
  totalPages:number;
  totalItems:number;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  I18nLang:any
  SearchText: string = '';
  isActive: number  = -1;
  wrapSettings = { wrapMode: 'Content' };
  mount = false;
  totalItemsHistory = 0;
  //new
  listEmployee:Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmp;
  listHistory:Array<any>= []
  tblBoPhan:Array<any>= []
  tblBoPhanOrigin:Array<any>= []
  tblNhomPhu:Array<any>= []
  tblTinhTrang:Array<any>= []
  tblEmployeeType:Array<any>= []
  EmployeeSelected:any;
  defaultColor = AppCommon.defaultColor
  user:UserModel | null
  @ViewChild('grid') public grid?: GridComponent;
  selectedGrid:any;
  //model
  FullName:string;
  stringImage:any;
  stringImageBase64:any;
  fileName:any;
  fileSize:any;
  fileImage:any;


  MaNhanVien:string;
  V3ID:string;
  BU:string;
  selectedPhongBan:any;
  NgayNhanViec = new Date().toISOString();
  selectedNhomPhu:any;
  selectedTinhTrang:any;
  selectedEmployeeType:any;
  CostCenter:string
  TransactionEntry:string
  Location:string
  EmployeeCategory:string;


  I18Lang:any

  constructor(
    private _api:ApiHttpService,
    private _export:ExportCommonService,
    private _noti:NotificationService,
    private _langS:LanguageService,
    private _sideBar:SideBarService,
    private _import:ImportService,
    private _userService: AuthService,){
      this.user = this._userService.getUser();
      this.I18Lang = this._langS.I18LangService;
  }
  selectImage(event:any){
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        if(file.type != "image/jpeg" && file.type != "image/png" &&  file.type != "image/jpg")
        {
          this._noti.ShowToastError('chỉ hỗ trợ ảnh jpg, jpeg hoặc png')
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.stringImage = reader.result;
          this.stringImageBase64 = null;
          let base64str = this.stringImage.split("base64,").length > 1 ? this.stringImage.split("base64,")[1] : "";     //
          this.fileName = file.name;
          this.fileSize = file.size;
          this.fileImage = base64str;
        }
      }
    }
  }
  onAddNewEmp(){
    this.ResetModel();
    this.empaddnewdialog.show();
  }

  ngOnInit() {
    this.LoadListMember();
    this.getConfig();
  }

  getConfig(){
    this._api.post(AppAPIConst.QuanLyNhanVien.employees_spGetDefault)
    .subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.tblBoPhanOrigin = res.Data.tblBoPhan
        this.tblBoPhan = this.InitNested(res.Data.tblBoPhan,null);
        this.tblNhomPhu = res.Data.tblNhomPhu
        this.tblTinhTrang = res.Data.tblTinhTrang
        this.tblEmployeeType = res.Data.tblEmployeeType
      }
    })
  }

  InitNested(tabs: any[], ParentCode: string | null): any[] {
    const nestedTabs: any[] = [];
    const Empty: any[] = [];
    for (const tab of tabs) {
      if (tab.ParentCode === ParentCode) {
        const nestedTab = { ...tab, Children:Empty};
        nestedTab.Children = this.InitNested(tabs, tab.DepartmentCode);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }

  GetPhoto(photoid: string){
     return fnCommon.ConvertPhotoEmp(photoid);
  };

  GetPhotoByUserID(userID:string){
    return fnCommon.ConvertPhotoEmpByUserID(userID)
  }


  ClickPageMember(page:any){
    this.PageIndex = page;
    this.LoadListMember();
  }

  LoadListMember(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Employees_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize
    },true).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listEmployee = res.Data.Data
        this.listEmployee.map(x => {
          x.Photo = fnCommon.ConvertPhotoEmp(x.PhotoID)
          return x;
        })
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }


  LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.employees_spLichSuThanhToan,{
      PageIndex:this.PageIndexHistory,
      PageSize:this.PageSizeHistory,
      SearchText:'',
      EmployeeCode:this.EmployeeSelected.EmployeeCode,
    }).subscribe(res=>{
      if(res && res.Data){
        this.listHistory = res.Data.Data
        this.totalItemsHistory = res.Data.OutputParams.TotalItems
      }
    })
  }

  ClickHistoryEmp(item:any){
    this.EmployeeSelected = item;
    this.PageIndexHistory = 0;
    if(this.EmployeeSelected && this.EmployeeSelected?.EmployeeCode){
      this.LoadListHistory();
      this.dialogHistory.show()
    }
  }

  ClickPagerHistory(page:any){
    this.PageIndexHistory = page;
    this.LoadListHistory();
  }




  selectedRow(item:any){
    const data = item.rowData
    this.selectedGrid = data;
    console.log(item);
    this.V3ID = data.BarCode
    this.BU = data.BU
    this.FullName = data.EmployeeName
    this.selectedPhongBan = this.tblBoPhanOrigin.find(x => x.DepartmentCode == data.DepartmentCode)
    this.NgayNhanViec = data.JoinDate
    this.selectedNhomPhu = this.tblNhomPhu.find(x => x.NhomPhuCode == data.NhomPhuCode)
    this.selectedTinhTrang = this.tblTinhTrang.find(x => x.TinhTrangCode == data.TinhTrangCode)
    this.CostCenter = data.CostCenter
    this.Location = data.Location
    this.selectedEmployeeType = this.tblEmployeeType.find(x => x.EmployeeTypeCode == data.EmployeeTypeCode)
    this.EmployeeCategory = data.EmployeeCategory
    this.stringImageBase64 = this.selectedGrid.PhotoID

    this.fileImage = this.selectedGrid.img;
    this.stringImage = null// this.selectedUser.img ? 'data:image/png;base64,' + this.selectedUser.img : null
    this.fileName = this.selectedGrid.fileName
    this.fileSize = this.selectedGrid.FileSize
    this.MaNhanVien = data.EmployeeCode
  }

  SaveEmployee(item:any){
    this._api.post(AppAPIConst.QuanLyNhanVien.employees_spPostData,{
      EmployeeCode:this.MaNhanVien,
      BarCode:this.V3ID,
      BU:this.BU,
      EmployeeName:this.FullName,
      DepartmentCode:this.selectedPhongBan?.DepartmentCode,
      JoinDate:this.NgayNhanViec,
      NhomPhu:this.selectedNhomPhu?.NhomPhuCode,
      TinhTrang:this.selectedTinhTrang?.TinhTrangCode,
      CostCenter:this.CostCenter,
      Location:this.Location,
      EmployeeType:this.selectedEmployeeType?.EmployeeTypeCode,
      EmployeeCategory:this.EmployeeCategory
    }).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }
        this.PageIndex = 0;
        this.empaddnewdialog.hide();
        this.ResetModel();
        this.LoadListMember();
        this._noti.ShowToastSuccess('Thành công')
      }
    })
  }

  ResetModel(){
    this.V3ID = ''
    this.BU = ''
    this.FullName = ''
    this.selectedPhongBan = null
    this.NgayNhanViec = ''
    this.selectedNhomPhu = null
    this.selectedTinhTrang = null
    this.CostCenter = ''
    this.Location = ''
    this.selectedEmployeeType = null
    this.EmployeeCategory = ''
    this.fileImage = null
    this.fileSize = null
    this.fileName = null
    this.stringImage = null
    this.stringImageBase64 = null
  }

  onEdit(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18Lang.Error.NoRowSelected)
      return;
    }
    this.empaddnewdialog.show();
  }

  onDelete(){
    if(!this.selectedGrid){
      this._noti.ShowToastError(this.I18Lang.Error.NoRowSelected)
      return;
    }
    this._noti.Confirm({
      content:this.I18Lang.Common.WantToDelete,
      title:this.I18Lang.Common.Alert,
      OkFunction:()=>{
        this._api.post(AppAPIConst.QuanLyNhanVien.employees_spDeleteData,{
          strCode:this.selectedGrid?.EmployeeCode,
        }).subscribe(res=>{
          if(res && res.Data){
            if(res?.Data?.Error){
              this._noti.ShowToastError(res?.Data?.Error.Message)
              return;
            }
            this.PageIndex = 0;
            this.ResetModel();
            this._noti.ShowToastSuccess(this.I18Lang.Common.Success)
            this.LoadListMember()
          }
        })
      }
    })
  }
  ExportMember(){
    this._export.excute({
      data:{
        FunctionID:this._sideBar.FunctionID,
        TypeCode:this._sideBar.FunctionID,
      },
      path:'export/getlistaccount'
    })
  }

  ImportMember(event:any){
    this._import.selectFileImport(event,{
      FunctionID:this._sideBar.FunctionID,
      TypeCode:this._sideBar.FunctionID,
      callBack:()=>{
        this.PageIndex = 0;
        this.ResetModel();
        this.LoadListMember()
      }
    });
  }
}
