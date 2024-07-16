import { Component, OnInit, ViewChild } from '@angular/core';
import { AppDialogComponent } from 'src/app/shares/components/app-dialog/app-dialog.component';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';

@Component({
  selector: 'app-cap-phat-dinh-muc',
  templateUrl: './cap-phat-dinh-muc.component.html',
  styleUrls: ['./cap-phat-dinh-muc.component.scss']
})
export class CapPhatDinhMucComponent implements OnInit {
  @ViewChild('dialogCapPhat') dialogCapPhat:AppDialogComponent
  listCapPhat:Array<any> = [];
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  height:number = (window.innerHeight - 202)
  totalPages:number;
  totalItems:number;
  SearchText:string;
  tblBU : Array<any> = []
  tblBoPhan : Array<any> = []
  tblEmployees : Array<any> = []
  tblEmployeesDialog : Array<any> = []
  tblThang : Array<any> = []

  selectetedBU:any
  selectetedBoPhan:any
  selectetedEmployees:any;
  lstEmpSelected:Array<any> = []
  selectetedThang:any

  tienDM1:string
  tienDM2:string
  lstEmpSelectedDialog:Array<any> = []
  selectetedEmployeesDialog:any
  selectetedThangDialog:any

  getPhoto = fnCommon.ConvertPhotoEmpByUserID;
  I18nLang:any
  constructor(
    private _api:ApiHttpService,private _noti:NotificationService,
    private _langService:LanguageService
  ){
    this.I18nLang = this._langService.I18LangService
  }


  ngOnInit(): void {
    this.getConfig();
  }

  ResetModel(){
    this.tienDM1 = ''
    this.tienDM2 = ''
    this.lstEmpSelectedDialog = []
    this.selectetedEmployeesDialog = ''
    this.selectetedThangDialog = ''
    this.tblEmployeesDialog.map(x => {
      if(x?.IsChecked){
        x.IsChecked = false;
      }
      return x
    })
  }

  RowSelected(event:any,type?:number){
    if(type == 1){
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // console.log( this.ListSelected);
    }
    else{
      // this.ListSelected = this.ListSelected.filter(x => x != event.data["UnionCode"])
      // this.ListSelected.push(event.data["UnionCode"])
    }
  }

  ViewData(){
    this.PageIndex = 0;
    this.ResetModel();
    this.getListCapPhatDinhMuc();
  }

  getListCapPhatDinhMuc(){
    this._api.post(AppAPIConst.CapPhatDinhMucNV.capdinhmuc_spGetData,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.SearchText,
      BU:this.selectetedBU?.BU,
      BoPhan:this.selectetedBoPhan?.DepartmentCode,
      EmployeeCode:this.lstEmpSelected.map(x => x?.EmployeeCode ?? '').join(';'),
      Thang:this.selectetedThang?.Thang
    },true).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }
        this.listCapPhat = res.Data.Data
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }

  getConfig(){
    this._api.post(AppAPIConst.CapPhatDinhMucNV.capdinhmuc_spgetDefault).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.tblBU = res.Data.tblBU
        this.tblBoPhan = this.InitNested(res.Data.tblBoPhan,null)
        this.tblEmployees = res.Data.tblEmployees
        this.tblEmployeesDialog = res.Data.tblEmployees
        this.tblThang = res.Data.tblThang
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

  handleSelectEmp(emp:any){
    // if(emp == null){
    //   this.lstEmpSelected = []
    //   this.selectetedEmployees = ''
    //   return;
    // }
    // if(emp?.IsChecked){
    //   this.lstEmpSelected = this.lstEmpSelected.filter(x => x.EmployeeCode != emp.EmployeeCode)
    //   this.lstEmpSelected.push(emp)
    // }
    // else{
    //   this.lstEmpSelected = this.lstEmpSelected.filter(x => x.EmployeeCode != emp.EmployeeCode)
    // }
    this.lstEmpSelected = emp
    this.selectetedEmployees = this.lstEmpSelected.map(x => x?.EmployeeName ?? '').join(';')
  }
  handleSelectEmpDialog(emp:any){
    // if(emp == null){
    //   this.lstEmpSelected = []
    //   this.selectetedEmployees = ''
    //   return;
    // }
    // if(emp?.IsChecked){
    //   this.lstEmpSelectedDialog = this.lstEmpSelectedDialog.filter(x => x.EmployeeCode != emp.EmployeeCode)
    //   this.lstEmpSelectedDialog.push(emp)
    // }
    // else{
    // }
    this.lstEmpSelectedDialog = emp
    this.selectetedEmployeesDialog = this.lstEmpSelectedDialog.map(x => x?.EmployeeName ?? '').join(';')
    console.log(this.selectetedEmployeesDialog);
  }

  onOpenCapPhatDinhMuc(){
    this.ResetModel();

    this.dialogCapPhat.show();
  }

  onSubmit(){
    this._api.post(AppAPIConst.CapPhatDinhMucNV.capdinhmuc_spGetData,{
      EmployeeCode:this.lstEmpSelectedDialog.map(x => x?.EmployeeCode ?? '').join(';'),
      Thang:this.selectetedThangDialog?.Thang,
      TienDinhMuc1:this.tienDM1,
      TienDinhMuc2:this.tienDM2
    },true).subscribe(res=>{
      if(res && res.Data){
        if(res.Data.Error){
          this._noti.ShowToastError(res.Data.Error.Message)
          return;
        }
        this.dialogCapPhat.hide();
        this.ViewData();
        this._noti.ShowToastSuccess('Thành công')
      }
    })
  }


  ClickPage(page:any){
    this.PageIndex = page;
    this.getListCapPhatDinhMuc();
  }


}
