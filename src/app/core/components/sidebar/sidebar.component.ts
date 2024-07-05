import {  Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { SidebarModel } from 'src/app/shares/models/SidebarModel';
import { AuthService } from 'src/app/shares/services/authentication/authentication.service';
import { NotificationService } from 'src/app/shares/services/notification/notification.service';
import { SideBarService } from 'src/app/shares/services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  ListSideBar: Array<SidebarModel> = [];
  height = window.innerHeight;
  ListSideBarCheck: Array<SidebarModel> = [
    {
      FunctionID: 'M001',
      DefaultName: 'Cơ cấu tổ chức',
      Icon: 'icon-Development-29',
      Url: 'co-cau-to-chuc',
      Active: false,
      Children: [],
      ParentID: null
    },
    {
      FunctionID: 'M002',
      DefaultName: 'Danh mục',
      Icon: 'icon-Development-11',
      Url: 'menu',
      Active: false,
      Children: [],
      ParentID: null
    },
    {
      FunctionID: 'M003',
      DefaultName: 'Quản lý thẻ nhân viên',
      Icon: 'icon-Users-37',
      Url: 'food',
      Active: false,
      Children: [],
      ParentID: null
    },
    {
      FunctionID: 'M004',
      DefaultName: 'Quản lý thẻ khách',
      Icon: 'icon-MapTravel-42',
      Url: 'member',
      Active: false,
      Children: [],
      ParentID: null
    },
    {
      FunctionID: 'M005',
      DefaultName: 'Báo cáo',
      Icon: 'icon-Files-55',
      Url: 'guess',
      Active: false,
      Children: [],
      ParentID: null
    },
    {
      FunctionID: 'M006',
      DefaultName: 'Danh sách nhân viên',
      Icon: 'icon-Files-55',
      Url: '/account/danh-sach-nhan-vien',
      Active: false,
      Children: [],
      ParentID: 'M003'
    },
    {
      FunctionID: 'M007',
      DefaultName: 'Cấp phát định mức sử dụng',
      Icon: 'icon-Files-55',
      Url: '/account/cap-phat-dinh-muc',
      Active: false,
      Children: [],
      ParentID: 'M003'
    },
    {
      FunctionID: 'M008',
      DefaultName: 'Theo dõi lịch sử thanh toán',
      Icon: 'icon-Files-55',
      Url: '/account/theo-doi-lich-su-thanh-toan',
      Active: false,
      Children: [],
      ParentID: 'M003'
    }
    ,
    {
      FunctionID: 'M009',
      DefaultName: 'Danh sách thẻ khách',
      Icon: 'icon-Files-55',
      Url: '/guess/danh-sach-the-khach',
      Active: false,
      Children: [],
      ParentID: 'M004'
    },
    {
      FunctionID: 'M010',
      DefaultName: 'Cấp phát thẻ khách',
      Icon: 'icon-Files-55',
      Url: '/guess/cap-phat-the-khach',
      Active: false,
      Children: [],
      ParentID: 'M004'
    },
    {
      FunctionID: 'M011',
      DefaultName: 'Theo dõi lịch sử thanh toán',
      Icon: 'icon-Files-55',
      Url: '/guess/theo-doi-lich-su-thanh-toan',
      Active: false,
      Children: [],
      ParentID: 'M004'
    }
    ,
    {
      FunctionID: 'M012',
      DefaultName: 'Nhóm phụ nhân viên',
      Icon: 'icon-Files-55',
      Url: '/setting/emp-subgroup',
      Active: false,
      Children: [],
      ParentID: 'M002'
    },
    {
      FunctionID: 'M013',
      DefaultName: 'Ca ăn',
      Icon: 'icon-Files-55',
      Url: '/setting/food-shift',
      Active: false,
      Children: [],
      ParentID: 'M002'
    },
    {
      FunctionID: 'M017',
      DefaultName: 'Phân loại line món ăn',
      Icon: 'icon-Files-55',
      Url: '/setting/food-line',
      Active: false,
      Children: [],
      ParentID: 'M002'
    },
    {
      FunctionID: 'M018',
      DefaultName: 'Tình hình sử dụng thẻ nhân viên',
      Icon: 'icon-Files-55',
      Url: '/report/tinh-hinh-su-dung-the-nhanvien',
      Active: false,
      Children: [],
      ParentID: 'M005'
    },
    {
      FunctionID: 'M019',
      DefaultName: 'Tình hình sử dụng thẻ khách',
      Icon: 'icon-Files-55',
      Url: '/report/tinh-hinh-su-dung-the-khach',
      Active: false,
      Children: [],
      ParentID: 'M005'
    },
    {
      FunctionID: 'M020',
      DefaultName: 'Thống kê định mức',
      Icon: 'icon-Files-55',
      Url: '/report/theo-doi-nhan-vien',
      Active: false,
      Children: [],
      ParentID: 'M005'
    },
    {
      FunctionID: 'M021',
      DefaultName: 'Thống kê thanh toán theo line',
      Icon: 'icon-Files-55',
      Url: '/report/theo-doi-line',
      Active: false,
      Children: [],
      ParentID: 'M005'
    }
  ];


  tabSelected: any = 1;
  constructor(
    private sanitizer: DomSanitizer,
    private _router: Router,
    private _auth: AuthService,
    private _activeRoute: ActivatedRoute,
    private _noti: NotificationService,
    private _sidebarService:SideBarService
  ) {


  }

  ngOnInit(): void {
    if (this._auth.getUser()?.Administrator) {
      this.getMenu();
    }
    else {
      this._router.navigate(['history-emp'])
    }
    //this.getMenu();
  }

  fnSanitizer(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(`<div class="svg">${html}</div>`);
  }

  fnClickTab(item: any) {
    this.tabSelected = item.FunctionID
    this._sidebarService.FunctionID = item.FunctionID;
    console.log(this.tabSelected);
    this._sidebarService.breadcrumb.next(item)
    this._router.navigate([item.Url])
  }

  buildNested(tabs: SidebarModel[], ParentID: string | null): SidebarModel[] {
    const nestedTabs: SidebarModel[] = [];
    const Empty: SidebarModel[] = [];
    for (const tab of tabs) {
      if (tab.ParentID === ParentID) {
        const nestedTab = { ...tab, Children: Empty };
        nestedTab.Children = this.buildNested(tabs, tab.FunctionID);
        nestedTabs.push(nestedTab);
      }
    }
    return nestedTabs;
  }


  getMenu() {
    this.ListSideBar = this.buildNested(this.ListSideBarCheck, null)
    this._sidebarService.finishSideBar.next(true);
    this._activeRoute.params.subscribe(x=>{
     if(this.ListSideBarCheck.length > 0){
       let url = this._router.url;
       if(url == "/"){
         url = "/co-cau-to-chuc"
       }
       let itemCheck = this.ListSideBarCheck.find(y => y.Url == this._router.url);
       if(itemCheck){
         let item = this.ListSideBarCheck.find(y => y.Url == this._router.url);
         if(item){
           this._sidebarService.FunctionID = item.FunctionID;
           this.tabSelected = item.FunctionID;
           this._sidebarService.breadcrumb.next(item)
           let parentExist = this.ListSideBarCheck.find(y => y.FunctionID == item?.ParentID);
           if(parentExist){
             let parentIndex = this.ListSideBar.findIndex(y => y.FunctionID == parentExist?.FunctionID);
             this.ListSideBar[parentIndex]['Active'] = true
           }
         }
         else{
           item = this.ListSideBarCheck.find(x => x.Url);
           if(item){
             this._sidebarService.FunctionID = item?.FunctionID;
             this._sidebarService.breadcrumb.next(item)
             this.tabSelected = item?.FunctionID;
             this._router.navigateByUrl(item.Url ?? '')
           }else{
             this._router.navigate([AppRoutes.notAuthor])
           }
         }
       }
       else{
         itemCheck = this.ListSideBarCheck.find(x => x.Url);
         if(itemCheck){
           this._sidebarService.FunctionID = itemCheck?.FunctionID;
           this._sidebarService.breadcrumb.next(itemCheck)
           this.tabSelected = itemCheck?.FunctionID;
           console.log(itemCheck?.Url);
           this._router.navigateByUrl(itemCheck.Url ?? '')
         }else{
           this._router.navigate([AppRoutes.notAuthor])
         }
       }
     }
     else{
       this._router.navigate([AppRoutes.notAuthor])
     }
    })
  }

  ToogleTabs(item: any) {
    const index = this.ListSideBar.findIndex(x => x.FunctionID == item.FunctionID)
    this.ListSideBar[index].Active = !this.ListSideBar[index].Active
    if (item.Children.length == 0) {
      this.tabSelected = item.FunctionID;
      this._sidebarService.FunctionID = item.FunctionID;
      this._sidebarService.breadcrumb.next(item)
      this.ListSideBar.forEach((x) => {
        if (item.FunctionID != x.FunctionID) {
          x.Active = false
        }
      })
      this._router.navigate([item.Url])
    }
  }


  checkActicSidebar(item: any, tab: any) {
    if (item.FunctionID == this.tabSelected) return true
    if (item.Children.length == 0) return false;
    for (const x of item.Children) {
      if (x.FunctionID == tab) {
        return true
      }
    }
    return false;
  }

  Logout() {
    this._noti.Confirm({
      title: "Thông báo",
      content: "Bạn có muốn đăng xuất?",
      OkFunction: () => {
        localStorage.clear();
        this._router.navigate([AppRoutes.login]);
      }
    })

  }
}
