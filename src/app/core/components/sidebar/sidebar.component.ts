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
  ListBarNhanVien = [
    {
      MenuID: 'M001',
      Label: 'Đặt món',
      Icon:'basket',
      route:'order',
    },
    {
      MenuID: 'M002',
      Label: 'Đặt món theo ngày',
      Icon:'file-text',
      route:'menu-employee',
    },
  ]
  ListSideBarCheck:Array<SidebarModel> = [
    {
      FunctionID: 'M001',
      DefaultName: 'Trang Chủ',
      Icon:'house-door',
      Url:'home',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M002',
      DefaultName: 'Thực đơn',
      Icon:'file-text',
      Url:'menu',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M003',
      DefaultName: 'Món ăn',
       Icon:'ticket-perforated',
      Url: 'food',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M004',
      DefaultName: 'Nhân viên',
      Icon:'people-fill',
      Url: 'member',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M005',
      DefaultName: 'Thẻ khách',
      Icon:'person-badge-fill',
      Url:'guess',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M006',
      DefaultName: 'Đặt theo món',
      Icon:'person-lines-fill',
      Url: 'book-group',
      Active:false,
      Children:[],
      ParentID:''
    },
    {
      FunctionID: 'M007',
      DefaultName: 'Quản trị',
      Icon:'gear',
      Url:'setting',
      Active:false,
      Children:[],
      ParentID:''
    },
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
