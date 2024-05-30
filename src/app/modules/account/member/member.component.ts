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
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  selectedDate:any;

  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
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

  //new
  listEmployee:Array<any> = []

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
  user:UserModel | null
  @ViewChild('grid') public grid?: GridComponent;
  constructor(
    private _api:ApiHttpService,
    private _router:Router,
    private _ordinal:OrdinalService,
    private _sanitized: DomSanitizer,
    private _modalService: BsModalService,
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


  ngOnInit() {
    this.LoadListMember();
  }
  GetPhoto(photoid: string){
     return fnCommon.ConvertPhotoEmp(photoid);
   };

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



  LoadListMember(){
    this._api.post(AppAPIConst.QuanLyNhanVien.Employees_get,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize
    }).subscribe(res=>{
      if(res && res.Data){
        console.log(res);
        this.listEmployee = res.Data.Data
        this.totalItems = res.Data.OutputParams.TotalItems
      }
    })
  }








  selectedRow(item:any){
  }
}
