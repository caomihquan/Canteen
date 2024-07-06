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

  //model
  FullName:string;
  stringImage:any;
  stringImageBase64:any;
  MaNhanVien:string;
  V3ID:string;
  BU:string;
  selectedPhongBan:any;
  NgayNhanViec = new Date().toISOString();
  selectedNhomPhu:any;
  selectedTinhTrang:any;
  selectedEmployeeType:any;


  I18Lang:any

  constructor(
    private _api:ApiHttpService,
    private _router:Router,
    private _ordinal:OrdinalService,
    private _sanitized: DomSanitizer,
    private _noti:NotificationService,
    private _langS:LanguageService,
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
          alert('chỉ hỗ trợ ảnh jpg, jpeg hoặc png');
        }
        else
        {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            //reader.result
          }
        }

      }
    }
  }
  onAddNewEmp(){
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
        this.tblEmployeeType = res.Data.tblTinhTrang
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
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }


  LoadListHistory(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Danhmuc_get,{
      PageIndex:this.PageIndexHistory,
      PageSize:this.PageSizeHistory,
      SearchText:this.EmployeeSelected.EmployeeCode,
      Option:7
    }).subscribe(res=>{
      if(res && res.Data){
        this.listHistory = res.Data.Data
        this.totalItemsHistory = res.Data.OutputParams.TotalItems
      }
    })
  }

  ClickHistoryEmp(item:any){
    this.EmployeeSelected = item;
    if(this.EmployeeSelected && this.EmployeeSelected?.EmployeeCode){
      this.LoadListHistory();
      this.dialogHistory.show()
    }
  }

  ClickPagerHistory(page:any){
    console.log(page);
  }




  selectedRow(item:any){
  }

  SaveEmployee(item:any){
    this._api.post(AppAPIConst.QuanLyNhanVien.employee_post,{
      dataEmp:item
    }).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error)
          return;
        }
        this.PageIndex = 0;
        this.LoadListMember();
        this._noti.ShowToastSuccess('Thành công')
      }
    })
  }
}
