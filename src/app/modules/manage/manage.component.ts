import { Component, ElementRef, Renderer2, ViewChild,OnInit } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shares/models/user-model';
import { UserService } from './services/manage.service';

import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { fnCommon } from 'src/app/shares/helpers/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  isNew : boolean = false;
  listUnion:Array<any> = [];
  Union: any = {};
  stringImage:any;
  user:UserModel | null;
  DateOptions = {
    mode: 'single',
    dateFormat: 'd.m.Y',
    defaultDate: new Date(Date.now() - (86400000*30)),
    maxDate: new Date(Date.now() - 86400000),
  };
  selectedDate:any;
  selectedAuthorizre : number = -1;
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  height:number = (window.innerHeight - 202)
  totalPages:number;
  totalItems:number;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  wrapSettings = { wrapMode: 'Content' };
  I18nLang:any
  SearchText: string = '';
  modalRef:BsModalRef;
  DataUnionStatus :Array<any> = [];
  selectUnionStatus :any = {
    Value: "",
    Caption: "",
  }
  DataGender :Array<any> = [];
  selectGender :any = {
    Value: "",
    Caption: "",
  }
  isActive: number  = -1;

  Num1: number = 1;
  Num2: number = 30;
  Desc: boolean = false;
  loginInfo: any={};
  constructor(private renderer:Renderer2,
    private _router:Router,
    private _MemberService:UserService,
    private _ordinal:OrdinalService,
    private _sanitized: DomSanitizer,
    private _modalService: BsModalService,
    private _languageService:LanguageService,
    private translate: TranslateService,
    private _userService: AuthService,

    private sanitizer:DomSanitizer,){
      this.user = this._userService.getUser();
      this.loginInfo =  this._userService.getUser();
      this.translate.use('vn')
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
            this.stringImage = reader.result;
            let base64str = this.stringImage.split("base64,").length > 1 ? this.stringImage.split("base64,")[1] : "";     //
            this.Union.fileName = file.name;
            this.Union.fileType= file.type;
            this.Union.fileSize=file.size;
            this.Union.filedata=base64str;
            this.Union.fileID= fnCommon.uuidv4();
          }
        }

      }
    }
  }

  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }
  ngOnInit() {
    this.getLanguage();
    this.PageIndex = 1;
    this._ordinal.finishSideBar.subscribe(res=>{
      if(res){
        this.LoadConfig();
      }
    })
  }
  SetPermission(status : number)
  {
    this.selectedAuthorizre = status;
    this.Union['UserType'] = status;


    // if(status == 2)
    // {
    //   this.Union['Administrator'] = true;
    //   this.Union['SystemAdmin'] = false;
    //   this.Union['IsEmployee'] = false;
    // }
    // else if(status == 1)
    // {
    //   this.Union['Administrator'] = false;
    //   this.Union['SystemAdmin'] = true;
    //   this.Union['IsEmployee'] = false;
    // }
    // else
    // {
    //   this.Union['Administrator'] = false;
    //   this.Union['SystemAdmin'] = false;
    //   this.Union['IsEmployee']= false;
    // }
    this.Union['Administrator'] = false;
    this.Union['SystemAdmin'] = false;
    this.Union['IsEmployee']= false;
    switch (status) {
        case 2:
          this.Union['Administrator'] = true;
          break;
        case 1:
          this.Union['SystemAdmin'] = true;
          break;
        case 0:
          this.Union['IsEmployee']= true;
          break;
        default:
          break;
      }
  }

  LoadConfig(){
    this._MemberService.InitUnion({
      option: 7
    }).subscribe(res=>{
      if(!res.Error){
          //console.log("dddddddddddddd",res);
          if(res.Data)
          {
            debugger
            this.DataUnionStatus = res.Data.DataUnion;
            this.DataGender = res.Data.DataGender;
          }
      }
      this.LoadListUnions();
    })
  }
  SortListUnions(){
    this.Desc = !this.Desc;
    this.LoadListUnions();
  }
  LoadListUnions(){
    this._MemberService.InitUnion({
      option: 8, SearchText: this.SearchText, Num1: this.Num1, Num2: this.Num2,
      Desc: this.Desc, PageIndex: this.PageIndex
    }).subscribe(res=>{
      if(!res.Error){
          if(res.Data && res.Data.Data)
          {
              this.listUnion = res.Data.Data;
              //console.log(fnCommon.ConvertPhotoByPhotoID(this.listUnion[0].PhotoID))
             // console.log(fnCommon.ConvertPhotoByPhotoID(this.listUnion[1].PhotoID))
             // console.log(fnCommon.ConvertPhotoByPhotoID(this.listUnion[2].PhotoID))
             // console.log(fnCommon.ConvertPhotoByPhotoID(this.listUnion[3].PhotoID))
        //    debugger
              this.totalPages = res.Data.OutputParams.TotalPage;
              this.totalItems = res.Data.OutputParams.PageSize;
          }
      }
    })
  }
  GetPhoto(photoid: string){
   // return fnCommon.ConvertPhotoEmp(photoid);

    return fnCommon.ConvertPhotoEmp(photoid);
  };

  LoadWithIndex(evt:any){
    if(evt?.currentPage){
      //console.log(evt);
      this.PageIndex = evt?.currentPage;
      this.LoadListUnions();
    }
  }
  onLoadSearch(){
    this.Num1 =1;
    this.Num2 =30;
    this.PageIndex=1;
    this.LoadListUnions();
  }
  doAddUnion(isnew: boolean)
  {
  //  debugger
    this.isNew = isnew;
    if(isnew == true) 
    {
      this.Union = {
        Gender: this.DataGender.length > 0 ? this.DataGender[0]?.Value : 0, 
        UnionStatus: this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Value : 0
      };
  
        this.selectGender.Caption = this.DataGender.length > 0 ? this.DataGender[0]?.Caption : ""
        this.selectGender.Value = this.DataGender.length > 0 ? this.DataGender[0]?.Value : "", 
    
        this.selectUnionStatus.Caption =this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Caption : 
        (this.DataUnionStatus.length == 1 ? this.DataUnionStatus[0]?.Caption : "");
  
        this.selectUnionStatus.Value = this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Value : 
        (this.DataUnionStatus.length == 1 ? this.DataUnionStatus[0]?.Value : "")
    }
    
  }
  validateBeforeSave(){
  }
  selectedRow(item:any){
    //console.log('selectedRow', item);
    this.isNew = false;
    this.isActive = item.rowIndex;
    this.Union = item.rowData;
    this.Union.fileID = this.Union.PhotoID;
    this.stringImage = "data:" +  this.Union.fileType + ";base64," + this.Union.Attachment;
    this.selectGender.Caption = item.rowData.GenderName;
    this.selectGender.Value = item.rowData.Gender
    this.Union.filedata = this.Union.Attachment;
    this.selectUnionStatus.Caption = item.rowData.StatusName;
    this.selectUnionStatus.Value = item.rowData.Status
  }
  doDeleteUnion(){
    if(this.isActive < 0 || this.isActive === null || this.isActive === undefined)
    {
      alert("Chưa chọn dòng nào để xóa");
      return;
    }

    const initialState = {
      title: this.I18nLang.Common.Notification,
      content:this.I18nLang.Common.WantToDelete,
      fnYes:()=>{
        this.modalRef.hide();
        this.docontinueDelete()
      },
      fnNo:()=>{
        this.modalRef.hide()
      }
    }
    this.modalRef = this._modalService.show(ModalComponent,{initialState});

  }
  docontinueDelete(){
    this._MemberService.DelUnion({
      option: 9, RecID: this.Union.RecID
    }).subscribe(res=>{
      if(!res.Error){
        const initialState = {
          title:this.I18nLang.Common.Alert,
          content:this.I18nLang.Common.Success,
        }
        this.modalRef = this._modalService.show(ModalComponent,{initialState});
        // this.listUnion = this.listUnion.filter(n=>n.UnionCode != this.Union.UnionCode);
        // this.Union = this.listUnion[this.isActive];
        this.LoadListUnions();
      }
    })
  }
  validateEmail(email :string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  SaveUnion(isnew: boolean)
  {
    this.Union.isNew = this.isNew;
    this.Union.option = 10;
    if(!this.Union.UserName)
    {
      alert("Chưa nhập tên người dùng");
      return;
    }
  
    else if(!this.Union.Birthday)
    {
      alert("Chưa nhập ngày sinh");
      return;
    }
   
    else if(this.Union.Email && this.validateEmail(this.Union.Email) == false)
    {
      alert("Email không đúng định dạng");
      return;
    }
    debugger
    if(!this.Union.fileID)
    {
      this.Union.fileName = '';
      this.Union.fileType= '';
      this.Union.fileSize=0;
      this.Union.filedata='';
      this.Union.fileID= '00000000-0000-0000-0000-000000000000';
    }
    this.Union.Birthday = fnCommon.convertDateSQL(this.Union.Birthday);
    this.Union.Gender = this.selectGender?.Value;
    this.Union.Status = this.selectUnionStatus?.Value;
    debugger

    this._MemberService.PostUnion(this.Union).subscribe(res=>{
      if(!res.Error){
        if(res.Data && res.Data.length > 0)
        {
          if(res.Data[0].SuccessUnion)
          {
            const initialState = {
              title:this.I18nLang.Common.Alert,
              content:this.I18nLang.Common.Success,
            }
            this.modalRef = this._modalService.show(ModalComponent,{initialState});
            document.getElementById('hideModalAdd')?.click();
            this.LoadListUnions();
            //alert(this.isNew ? "Thêm thành công" : "Cập nhật thành công")
          }
          else if(res.Data[0].ErrorUnion)
          {
            alert(res.Data[0].ErrorUnion)
          }
        }
      }
    })
  }
  autoGrowTextZone(e:any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

}
