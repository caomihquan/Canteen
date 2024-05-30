import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { SidebarModel } from 'src/app/shares/models/SidebarModel';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  ListSideBar:Array<SidebarModel> = [];
  height = window.innerHeight;
  // ListBarNhanVien = [
  //   {
  //     MenuID: 'M001',
  //     Label: 'Đặt món',
  //     Icon:'basket',
  //     route:'order',
  //   },
  //   {
  //     MenuID: 'M002',
  //     Label: 'Đặt món theo ngày',
  //     Icon:'file-text',
  //     route:'menu-employee',
  //   },
  // ]
  ListSideBarCheck:Array<SidebarModel> = [
    {
      FunctionID: 'M001',
      DefaultName: 'Cơ cấu tổ chức',
      Icon:'icon-Development-29',
      Url:'co-cau-to-chuc',
      Active:false,
      Children:[],
      ParentID:null
    },
    {
      FunctionID: 'M002',
      DefaultName: 'Danh mục',
      Icon:'icon-Development-11',
      Url:'menu',
      Active:false,
      Children:[],
      ParentID:null
    },
    {
      FunctionID: 'M003',
      DefaultName: 'Quản lý thẻ nhân viên',
      Icon:'icon-Users-37',
      Url: 'food',
      Active:false,
      Children:[],
      ParentID:null
    },
    {
      FunctionID: 'M004',
      DefaultName: 'Quản lý thẻ khách',
      Icon:'icon-MapTravel-42',
      Url: 'member',
      Active:false,
      Children:[],
      ParentID:null
    },
    {
      FunctionID: 'M005',
      DefaultName: 'Báo cáo',
      Icon:'icon-Files-55',
      Url:'guess',
      Active:false,
      Children:[],
      ParentID:null
    },
    {
      FunctionID: 'M006',
      DefaultName: 'Danh sách nhân viên',
      Icon:'icon-Files-55',
      Url:'/account/danh-sach-nhan-vien',
      Active:false,
      Children:[],
      ParentID:'M003'
    },
    {
      FunctionID: 'M007',
      DefaultName: 'Cấp phát định mức sử dụng',
      Icon:'icon-Files-55',
      Url:'/account/cap-phat-dinh-muc',
      Active:false,
      Children:[],
      ParentID:'M003'
    },
    {
      FunctionID: 'M008',
      DefaultName: 'Theo dõi lịch sử thanh toán',
      Icon:'icon-Files-55',
      Url:'/account/theo-doi-lich-su-thanh-toan',
      Active:false,
      Children:[],
      ParentID:'M003'
    }
    ,
    {
      FunctionID: 'M009',
      DefaultName: 'Danh sách thẻ khách',
      Icon:'icon-Files-55',
      Url:'/guess/danh-sach-the-khach',
      Active:false,
      Children:[],
      ParentID:'M004'
    },
    {
      FunctionID: 'M010',
      DefaultName: 'Cấp phát thẻ khách',
      Icon:'icon-Files-55',
      Url:'/guess/cap-phat-the-khach',
      Active:false,
      Children:[],
      ParentID:'M004'
    },
    {
      FunctionID: 'M011',
      DefaultName: 'Theo dõi lịch sử thanh toán',
      Icon:'icon-Files-55',
      Url:'/guess/theo-doi-lich-su-thanh-toan',
      Active:false,
      Children:[],
      ParentID:'M004'
    }
    ,
    {
      FunctionID: 'M012',
      DefaultName: 'Nhóm phụ nhân viên',
      Icon:'icon-Files-55',
      Url:'/setting/emp-subgroup',
      Active:false,
      Children:[],
      ParentID:'M002'
    },
    {
      FunctionID: 'M013',
      DefaultName: 'Ca ăn',
      Icon:'icon-Files-55',
      Url:'/setting/food-shift',
      Active:false,
      Children:[],
      ParentID:'M002'
    },
    {
      FunctionID: 'M014',
      DefaultName: 'Loại nhân viên',
      Icon:'icon-Files-55',
      Url:'/setting/food-shift',
      Active:false,
      Children:[],
      ParentID:'M002'
    },
    {
      FunctionID: 'M015',
      DefaultName: 'Địa điểm làm việc',
      Icon:'icon-Files-55',
      Url:'/setting/food-shift',
      Active:false,
      Children:[],
      ParentID:'M002'
    },
    {
      FunctionID: 'M016',
      DefaultName: 'Transaction Entity',
      Icon:'icon-Files-55',
      Url:'/setting/food-shift',
      Active:false,
      Children:[],
      ParentID:'M002'
    },
    {
      FunctionID: 'M017',
      DefaultName: 'Phân loại line món ăn',
      Icon:'icon-Files-55',
      Url:'/setting/food-line',
      Active:false,
      Children:[],
      ParentID:'M002'
    }
  ];

  tabSelected:any = 1;
  constructor(
    private sanitizer: DomSanitizer,
    private _router:Router,
    private _activeRoute:ActivatedRoute,
    private _apiHttp:ApiHttpService,
    private _ordinal:OrdinalService,
    private _auth:AuthService
    ){


  }

  ngOnInit(): void {
    this.getMenu()
  }

  fnSanitizer(html:string){
    return this.sanitizer.bypassSecurityTrustHtml(`<div class="svg">${html}</div>`);
  }

  fnClickTab(item:any){
    this.tabSelected = item.FunctionID
    this._router.navigate([item.Url])
  }

  buildNested(tabs: SidebarModel[], ParentID: string | null): SidebarModel[] {
    const nestedTabs: SidebarModel[] = [];
    const Empty: SidebarModel[] = [];
    for (const tab of tabs) {
      if (tab.ParentID === ParentID) {
        const nestedTab = { ...tab, Children:Empty};
        nestedTab.Children = this.buildNested(tabs, tab.FunctionID);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }


  getMenu(){
    this.ListSideBar = this.buildNested(this.ListSideBarCheck,null)
    console.log( this.ListSideBar,1111);

    this._activeRoute.params.subscribe(_x=>{
      if(this.ListSideBarCheck.length > 0){
        let url = this._router.url;
        if(url == "/"){
          url = "/home"
        }
        let item = this.ListSideBarCheck.find(y => y.Url == window.location.pathname);
        if(!item){
          item = this.ListSideBarCheck[0];
        }
        this.tabSelected = item.FunctionID
      }
    })
    return;
  }

  ToogleTabs(item:any){
    const index = this.ListSideBar.findIndex(x =>x.FunctionID == item.FunctionID)
    this.ListSideBar[index].Active = !this.ListSideBar[index].Active
    if(item.Children.length == 0){
      this.tabSelected = item.MenuID;
      this.ListSideBar.forEach((x)=>{
        if(item.FunctionID != x.FunctionID){
          x.Active = false
        }
      })
      this._router.navigate([item.Url])
    }
  }


  checkActicSidebar(item:any,tab:any){
    if(item.FunctionID == this.tabSelected) return true
    if(item.Children.length == 0) return false;
    for (const x of item.Children) {
      if(x.FunctionID == tab){
        return true
      }
    }
    return false;
  }
}
