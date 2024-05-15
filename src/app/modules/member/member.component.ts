import { Component, Renderer2,OnInit, ViewChild  } from '@angular/core';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shares/models/user-model';
import { MemberService } from './services/member.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { fnCommon } from 'src/app/shares/helpers/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  isNew : boolean = false;
  listUnion:Array<any> = [];
  Union: any = {};
  stringImage:any;
  user:UserModel | null;
  loginInfo: any={};
  DateOptions = {
    mode: 'single',
    dateFormat: 'd.m.Y',
    defaultDate: new Date(Date.now() - (86400000*30)),
    maxDate: new Date(Date.now() - 86400000),
  };
  selectedDate:any;

  PageIndex:number = 1//AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  height:number = (window.innerHeight - 202)
  totalPages:number;
  totalItems:number;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;

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
  wrapSettings = { wrapMode: 'Content' };
  mount = false;

  //new
  listEmployee:Array<any> = [{
    Ma:'DV01',
    FullName:'Huỳnh Phước Hòa',
    DepartmentName:'Phòng IT',
    JobWName:"Developer",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"hphoa@lac.cm",
    Phone:"0901234567",
    Note:"hnhoa",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  },{
    Ma:'DV02',
    FullName:'Cao Minh Quân',
    DepartmentName:'Phòng IT',
    JobWName:"Developer",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"cmquan@lac.cm",
    Phone:"0903333333",
    Note:"cmquan",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  },{
    Ma:'DV03',
    FullName:'Nguyễn văn A',
    DepartmentName:'Phòng IT',
    JobWName:"Developer",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"na@lac.cm",
    Phone:"09787777373",
    Note:"Dong nai",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  },{
    Ma:'DV04',
    FullName:'Cao Minh Nhật',
    DepartmentName:'Phòng IT',
    JobWName:"HR",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"cmquan@lac.cm",
    Phone:"0982888888",
    Note:"cmnhat",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  },{
    Ma:'DV05',
    FullName:'Nguyễn Hoàng Minh',
    DepartmentName:'Phòng IT',
    JobWName:"Developer",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"nhminh@lac.cm",
    Phone:"0909897546",
    Note:"nhminh",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  },{
    Ma:'DV06',
    FullName:'Cao THanh thúy',
    DepartmentName:'Phòng IT',
    JobWName:"Developer",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"cthuy@lac.cm",
    Phone:"0988888888",
    Note:"cthuy",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nử",
    StatusName:"Chính thức"
  },{
    Ma:'DV07',
    FullName:'Maria Joyce',
    DepartmentName:'Phòng IT',
    JobWName:"Kế toán trưởng",
    Gender:0,
    DateOfBirth:"05/12/2000",
    Email:"cmlan@lac.cm",
    Phone:"0922222222",
    Note:"cmlan",
    Status:1,
    NgayCapThe:new Date().toISOString(),
    SoXuDinhMuc:100,
    SoXuNapThem:100,
    LanNapGanNhat:new Date().toISOString(),
    PhotoID:"",
    GenderName:"Nam",
    StatusName:"Chính thức"
  }]

  listHistory:Array<any>= [
    {
      NgayPhatSinh:new Date().toISOString(),
      Type:2,
      Description:'',
      CreatedBy:'cmquan',
      UserName:'cmquan',
      Total:100,
    }
  ]
  listFood = [
    {
      Name:"Cơm tấm",
      SL:54,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bún riêu cua",
      SL:40,
      GroupID:2,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bánh canh cá lóc",
      SL:48,
      GroupID:1,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
    {
      Name:"Bún riêu cua",
      SL:40,
      GroupID:3,
      Type:1,
      Price:'45000VND',
      Mota:'Cơm với sườn cốt nết nướng, thêm trái trứng, chút bì chả chan nước mắt',
      CreatedOn:new Date().toISOString(),
      CreatedBy:''
    },
  ]
  defaultColor = AppCommon.defaultColor

  @ViewChild('grid') public grid?: GridComponent;
  constructor(private renderer:Renderer2,
    private _router:Router,
    private _MemberService:MemberService,
    private _ordinal:OrdinalService,
    private _sanitized: DomSanitizer,
    private _modalService: BsModalService,
    private _languageService:LanguageService,
    private translate: TranslateService,
    private _userService: AuthService,

    private sanitizer:DomSanitizer,){
      this.user = this._userService.getUser();
      this.loginInfo = this._userService.getUser();
      this.translate.use('vn')
  }
  selectImage(event:any){
    debugger
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
    //this.PageIndex = 1;
    this._ordinal.finishSideBar.subscribe(res=>{
      if(res){
        this.LoadConfig();
        this.LoadListUnions();
      }
    })
  }
  GetPhoto(photoid: string){
     return fnCommon.ConvertPhotoEmp(photoid);
   };

  LoadConfig(){
    this._MemberService.InitUnion1({
      option: 3
    }).subscribe(res=>{
      if(!res.Error){
          if(res.Data)
          {//debugger
            this.DataUnionStatus = res.Data.DataUnion;
            this.DataGender = res.Data.DataGender;
          }
      }
    })
  }

  SortListUnions(){
    this.Desc = !this.Desc;
    this.LoadListUnions();
  }

  LoadListUnions(){
    ////debugger
    this._MemberService.InitUnion({
      option: 4, SearchText: this.SearchText, Num1: this.Num1, Num2: this.Num2, Desc: this.Desc, PageIndex: this.PageIndex
    }).subscribe(res=>{
      if(!res.Error){
        debugger
          if(res.Data && res.Data.Data)
          {
              this.listUnion = res.Data.Data;
              this.isActive = 0;
              this.totalPages = res.Data.OutputParams.TotalPage;
              this.totalItems = res.Data.OutputParams.PageSize;
              setTimeout(() => {
                (this.grid as GridComponent).selectRow(this.isActive);

              },500);
          }
      }
    })
  }

  LoadWithIndex(evt:any){
    debugger
    if(evt?.currentPage){
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
    debugger
    this.isNew = isnew;
    if(isnew == true)
    {
      this.Union = {
      Gender: this.DataGender.length > 0 ? this.DataGender[0]?.Value : 0,
      UnionStatus: this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Value : 0
      };

      this.selectGender.Caption = this.DataGender.length > 0 ? this.DataGender[0]?.Caption : "";
      this.selectGender.Value = this.DataGender.length > 0 ? this.DataGender[0]?.Value : "";
      debugger
      this.selectUnionStatus.Caption =this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Caption :
      (this.DataUnionStatus.length == 1 ? this.DataUnionStatus[0]?.Caption : "");

      this.selectUnionStatus.Value = this.DataUnionStatus.length > 1 ? this.DataUnionStatus[1]?.Value :
      (this.DataUnionStatus.length == 1 ? this.DataUnionStatus[0]?.Value : "")
    }
  }
  doExport(){
    //console.log('111',this.user);
    // _data["Application"] = _data["Application"] ? _data["Application"] : window.sys.getApplicationName();
    // _data["SessionID"] = _data["SessionID"] ? _data["SessionID"] : sys.getHrmSession();
    // _data["SessionApp"] = _data["SessionApp"] ? _data["SessionApp"] : sys.getCurrentAppSession();
    // _data["Language"] = _data["Language"] ? _data["Language"] : sys.getLanguage();
    // _data["Token"] = _data["Token"] ? _data["Token"] : sys.getLoginInfo().TokenID;
    // _data["FunctionID"] = _data["FunctionID"] ? _data["FunctionID"] : lv.$function($scope).getID();
    let _data = {Application: 'app',
    FunctionID:'unionmembers',
    SessionID: this.loginInfo['SessionID'],
    Language: 'vn',
    Token: this.loginInfo['TokenID'],
    SessionApp: 'app'
  };

    this._MemberService.GetUnion({
      option: 11, Parameters: JSON.stringify(_data)
    }).subscribe(res=>{
      //debugger
      if(!res.Error && res.Data && res.Data.Token){
        let token = res.Data.Token;
        //var url = "http://localhost/TTIWS" + "/" + "api/Feedback/XuatLopHoc";
        //window.open(url + "?tk=" + token, "_blank");
        this._MemberService.XuatLopHoc({
          Token:token
        }).subscribe(res=>{
          //debugger
          if(!res.Error && res.Data){
            //console.log(11111);
            this.downloadBase64File(res.Data.Data , res.Data.SheetName);
          }
        })

      }
    })
  }

  downloadBase64File(base64Data :any, fileName :any) {
    //debugger
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.target = '_blank';//target="_blank" rel="noopener noreferrer" , target='_self'
    downloadLink.download = fileName;
    downloadLink.click();

    // var blob = new Blob(
    //   [base64Data],
    //   {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"}
    // );
    // // Programatically create a link and click it:
    // var a = document.createElement("a");
    // a.href = URL.createObjectURL(blob);
    // a.download = fileName;
    // a.click();

  }
  doBeforeImport(data: any, callback: any)
  {
    data.doBeforeImport = true;
    if(callback)callback();
  }

  ContinueImporting(data: any){
    data.doBeforeImport = false;
    let text = "Có nhân viên được xóa trong file nhập khẩu, chắc chắn xóa khỏi hệ thống?";
    if (confirm(text) == true) {
      text = "You pressed OK!";
      this._MemberService.ImportData(data).subscribe(res=>{
        if(!res.Error && res.Data){
          this.modalRef.hide()
          alert("Nhập khẩu xong!");
          this.LoadListUnions();
        }
      })
    } else {
      text = "You canceled!";
    }

    // if(data)
    // {
    //   const initialState = {
    //     title: 'Cảnh báo',
    //     content: "Có nhân viên được xóa trong file nhập khẩu, chắc chắn xóa khỏi hệ thống?",
    //     fnYes:()=>{

    //     },
    //     fnNo:()=>{
    //       this.modalRef.hide()
    //       //console.log("data 2",data)
    //     }
    //   }
    //   this.modalRef = this._modalService.show(ModalComponent,{initialState});
    // }

  }

  ImportFile(data: any){
    if(data)
    {
      const initialState = {
        title: 'Nhập khẩu',
        content: 'Nhập danh sách dữ liệu: ' + data["FileName"],
        fnYes:()=>{
          //this.modalRef.hide();
          //console.log("data 1",data);
          data.doBeforeImport = true;
          this._MemberService.ImportData(data).subscribe(res=>{
            debugger
            if(!res.Error && res.Data){
              // cảnh báo yes đi tiếp, nO thì dừng
              debugger
              if(data.doBeforeImport && res.Data["WarningDelete"] == true)
              {
                 //this.ContinueImporting(data);
                 data.doBeforeImport = false;
                 let text = "Có nhân viên được xóa trong file nhập khẩu, chắc chắn xóa khỏi hệ thống?";
                 if (confirm(text) == true) {
                   text = "You pressed OK!";
                   this._MemberService.ImportData(data).subscribe(res=>{
                     if(!res.Error && res.Data){
                       this.modalRef.hide()
                       alert("Nhập khẩu xong!");
                       this.LoadListUnions();
                     }
                   })
                 } else {
                   text = "You canceled!";
                   this.modalRef.hide()
                 }
              }
              else
              {
                this.modalRef.hide()
                alert("Nhập khẩu xong!");
                this.LoadListUnions();
              }
            }
          })
        },
        fnNo:()=>{
          this.modalRef.hide()
          //console.log("data 2",data)
        }
      }
      this.modalRef = this._modalService.show(ModalComponent,{initialState});
    }
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
        this.ImportFile({
              ImportKey: randomKey,
              FileName: file.name,
              FileSize: file.size,
              FileType: file.type,
              FileContent: _binaryData,
              TypeCode: "unionmembers"
        })
      }
    }
    reader.readAsArrayBuffer(file);
    }
  }

  selectedRow(item:any){
    ////console.log('selectedRow', item);
    debugger
    this.isNew = false;
    this.isActive = item.rowIndex;
    this.Union = item.rowData;
    this.Union.fileID = this.Union.PhotoID

    this.stringImage = "data:" +  this.Union.fileType + ";base64," + this.Union.Attachment;
    this.Union.filedata = this.Union.Attachment;
    this.selectGender.Caption = item.rowData.GenderName;
    this.selectGender.Value = item.rowData.Gender

    this.selectUnionStatus.Caption = item.rowData.UnionStatusName;
    this.selectUnionStatus.Value = item.rowData.UnionStatus
  }

  doDeleteUnion(){
    if(this.isActive < 0 || this.isActive === null || this.isActive === undefined)
    {
      alert("Chưa chọn dòng nào để xóa");
      return;
    }
    ////debugger
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
    ////debugger
    this._MemberService.DelUnion({
      option: 5, UnionCode: this.Union.UnionCode
    }).subscribe(res=>{
      if(!res.Error){
        const initialState = {
          title:this.I18nLang.Common.Alert,
          content:this.I18nLang.Common.Success,
        }
        this.modalRef = this._modalService.show(ModalComponent,{initialState});
        ////debugger
        // this.listUnion = this.listUnion.filter(n=>n.UnionCode != this.Union.UnionCode);
        // this.Union = this.listUnion[this.isActive];
        this.LoadListUnions();
      }
    })
  }
  SaveUnion(isnew: boolean)
  {
    this.Union.isNew = this.isNew;
    this.Union.option = 6;

    if(!this.Union.UnionName)
    {
      alert("Chưa nhập tên đoàn viên");
      return;
    }
    else if(!this.Union.Birthday)
    {
      alert("Chưa nhập ngày sinh");
      return;
    }
    // else if(this.selectGender?.Value == null || this.selectGender?.Value == undefined)
    // {
    //   alert("Chưa chọn giới tính");
    //   return;
    // }
    // else if(!this.Union.JoinDate)
    // {
    //   alert("Chưa nhập ngày tham gia");
    //   return;
    // }
    // else if(this.selectUnionStatus?.Value == null || this.selectUnionStatus?.Value == undefined)
    // {
    //   alert("Chưa chọn tình trạng công tác");
    //   return;
    // }
    // else if(!this.Union.DepartmentName)
    // {
    //   alert("Chưa nhập bộ phận");
    //   return;
    // }

    if(!this.Union.fileID)
    {
      this.Union.fileName = '';
      this.Union.fileType= '';
      this.Union.fileSize=0;
      this.Union.filedata='';
      this.Union.fileID= '00000000-0000-0000-0000-000000000000';
    }
    this.Union.Birthday = fnCommon.convertDateSQL(this.Union.Birthday);
    this.Union.JoinDate = fnCommon.convertDateSQL(this.Union.JoinDate)
    this.Union.Gender = this.selectGender?.Value;
    this.Union.UnionStatus = this.selectUnionStatus?.Value;
    if(!this.Union.UnionCode) this.Union.UnionCode = "";
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

  getPhotoByUserID(userID:string){
    return fnCommon.ConvertPhotoEmpByUserID(userID)
  }
}
