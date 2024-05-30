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
  listSubgroup = [
    {
      STT: 1,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#FFEFE0',
      TextColor:'#FF8A00',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    },
    {
      STT: 2,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#FFFFE6',
      TextColor:'#FFB100',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    },
    {
      STT: 3,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#EFFFD4',
      TextColor:'#54BF61',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    },
    {
      STT: 4,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#C9FFE8',
      TextColor:'#02A44D',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    },
    {
      STT: 5,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#F1E6FF',
      TextColor:'#6404FF',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    },
    {
      STT: 6,
      TypeGroupName: 'Staff',
      GroupName: 'Nhân viên Công ty: Chính thức và thuê theo dự án (Staff)',
      GroupColor:'#E6F7FF',
      TextColor:'#0C359E',
      Objects:  'Nhân viên lao động gián tiếp: Nhân viên văn phòng, kỹ sư, quản lý, Ban lãnh đạo.... (Staff & above)',
      limit: '100.000 VND',
    }
  ]



  selectedTab = 1
  constructor(
    private _ordinal:OrdinalService,
    private _modalService: BsModalService,
    private _languageService:LanguageService,
    private _translate:TranslateService,
    private _menuService:MenuService,
    private _userService:AuthService
    ){
      _translate.use('vn');
      this.loginInfo = this._userService.getUser();
  }
  ngOnInit() {
    this.getLanguage()
    this._ordinal.finishSideBar.subscribe(res=>{
      if(res){
          this.GetMenu();
      }
    })
  }
  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }


  fnSelectedRule(){
    const initialState = {
      title:this.I18nLang.Common.Alert,
      content:this.I18nLang.Error.NoRowSelected,
    }
    this.modalRef = this._modalService.show(ModalComponent,{initialState});
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

  GetMenu(){
    this._menuService.GetRules({
      Status:2,
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchVal:this.searchText
    }).subscribe(res=>{
      if(!res.Error){
        console.log(res);

        this.totalItems = res.Data.Output[0].TotalItems
      }
    })
  }

  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
      this.GetMenu();
    }
  }

  DeleteMenu(){
    if(!this.selectedMenu){
      const initialState = {
        title: this.I18nLang.Common.Alert,
        content:this.I18nLang.Error.NoRowSelected,
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
    const initialState = {
      title: this.I18nLang.Common.Notification,
      content:this.I18nLang.Common.WantToDelete,
      fnYes:()=>{

      },
      fnNo:()=>{
        this.modalRef.hide()
      }
    }
    this.modalRef = this._modalService.show(ModalComponent,{initialState});

  }

  EditMenu(){
    if(!this.selectedMenu){
      const initialState = {
        title: this.I18nLang.Common.Alert,
        content:this.I18nLang.Error.NoRowSelected,
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
      return;
    }
  }

  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
      this.GetMenu();
    }
  }

  ResetModel(){

    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }




  PostMenu(){


  }

  selectFileImport(event:any){
    event.preventDefault();
    let files = event.target.files;
    if (files.length > 0) {
      let file = files[0]
      let reader = new FileReader();
      reader.onload = () => {
      if(reader.result){
        var array = new Uint8Array(reader.result  as ArrayBuffer);

        var _arrayBufferToBase64 = function (buffer: any) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        var _binaryData = _arrayBufferToBase64(array);
        var randomKey = "import_" + this.loginInfo['SessionID'] + "_" + Math.random().toString(36).replace(/[^a-z]+/g, '');
        // this.ImportFile({
        //       ImportKey: randomKey,
        //       FileName: file.name,
        //       FileSize: file.size,
        //       FileType: file.type,
        //       FileContent: _binaryData,
        //       TypeCode: "unionmembers"
        // })
      }
    }
    reader.readAsArrayBuffer(file);
    }
  }

  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  ClickTabFood(index:number){
    if(this.selectedTab == index) return;
    this.selectedTab = index;
  }
}
