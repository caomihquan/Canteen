import { Component, Renderer2,OnInit, ViewChild  } from '@angular/core';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shares/models/user-model';
import { MemberService } from './services/member.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { fnCommon } from 'src/app/shares/helpers/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { AddNewEmpDialogComponent } from './components/add-new-emp-dialog/add-new-emp-dialog.component';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  @ViewChild('dialogHistory') dialogHistory:DialogComponent
  @ViewChild('empaddnewdialog') empaddnewdialog:AddNewEmpDialogComponent
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
  modalRef:BsModalRef;
  isActive: number  = -1;
  wrapSettings = { wrapMode: 'Content' };
  mount = false;
  totalItemsHistory = 0;
  //new
  listEmployee:Array<any> = []

  listHistory:Array<any>= []
  EmployeeSelected:any;
  defaultColor = AppCommon.defaultColor
  user:UserModel | null
  @ViewChild('grid') public grid?: GridComponent;
  constructor(
    private _api:ApiHttpService,
    private _router:Router,
    private _ordinal:OrdinalService,
    private _sanitized: DomSanitizer,
    private _modalService: BsModalService,
    private _noti:NotificationService,
    private _userService: AuthService,){
      this.user = this._userService.getUser();
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
  protected onAddNewEmp(){
      this.empaddnewdialog.onOpenDialog();
  }

  ngOnInit() {
    this.LoadListMember();
  }
  GetPhoto(photoid: string){
     return fnCommon.ConvertPhotoEmp(photoid);
  };

  GetPhotoByUserID(userID:string){
    return fnCommon.ConvertPhotoEmpByUserID(userID)
  }

  // LoadConfig(){
  //   this._MemberService.InitUnion1({
  //     option: 3
  //   }).subscribe(res=>{
  //     if(!res.Error){
  //         if(res.Data)
  //         {//debugger
  //           this.DataUnionStatus = res.Data.DataUnion;
  //           this.DataGender = res.Data.DataGender;
  //         }
  //     }
  //   })
  // }

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
    this.empaddnewdialog.onOpenDialog(item.rowData);
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
