import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { AppRoutes } from 'src/app/shares/constants/AppRoutes';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  ListSideBar:Array<any> = [];
  ListSideBarCheck = [
    {
      MenuID: 'M001',
      Label: 'Trang Chủ',
      Icon:'house-door',
      route:'home',
    },
    {
      MenuID: 'M002',
      Label: 'Thực đơn',
      Icon:'file-text',
      route:'menu',
    },
    {
      MenuID: 'M003',
      Label: 'Món ăn',
       Icon:'ticket-perforated',
      route: 'food',
    },
    {
      MenuID: 'M004',
      Label: 'Nhân viên',
      Icon:'people-fill',
      route: '',
    },
    {
      MenuID: 'M005',
      Label: 'Thẻ khách',
      Icon:'person-badge-fill',
      route:'guess',
    },
    {
      MenuID: 'M006',
      Label: 'Đặt theo món',
      Icon:'person-plus-fill',
      route: '',
    },
    {
      MenuID: 'M007',
      Label: 'Quản trị',
      Icon:'gear',
      route:'setting',
    },
  ];

  tabSelected:any = 1;
  constructor(
    private sanitizer: DomSanitizer,
    private _router:Router,
    private _activeRoute:ActivatedRoute,
    private _apiHttp:ApiHttpService,
    private _ordinal:OrdinalService
    ){


  }

  ngOnInit(): void {
    this.getMenu()
  }

  fnSanitizer(html:string){
    return this.sanitizer.bypassSecurityTrustHtml(`<div class="svg">${html}</div>`);
  }

  fnClickTab(item:any){

    this.tabSelected = item.MenuID
    this._router.navigate([item.route])
    return
    this._apiHttp.post(AppAPIConst.SYSTEM.CheckPermission,'',{
      MenuID:item.MenuID
    }).subscribe(res=>{
      debugger
      if(!res.Error && res.Data.OutputParams.IsView){
        item.Icon = item.Icon.replaceAll('stroke="white"','stroke="#0174BE"')
        this.ListSideBar.filter(x=>x.MenuID != item.MenuID).forEach(y=>{
          y.Icon = y.Icon.replaceAll('stroke="#0174BE"','stroke="white"');
        })
        this.tabSelected = item.MenuID
        this._router.navigate([item.route])
      }
      else{
        this._router.navigate([AppRoutes.notAuthor])
      }
    })
  }

  // fnCheckPermission(MenuID:string){
  //   this._apiHttp.post(AppAPIConst.SYSTEM.CheckPermission,'',{
  //     MenuID:MenuID
  //   }).subscribe(res=>{
  //     console.log(res);
  //   })
  // }

  getMenu(){
    this.ListSideBar = this.ListSideBarCheck;
    return
    this._apiHttp.post(AppAPIConst.SIDEBAR.SideBar,'',null,true).subscribe(res=>{
      if(!res.Error){
        this.ListSideBar = res.Data.Data;
        this._ordinal.finishSideBar.next(true);
        this._activeRoute.params.subscribe(_x=>{
          console.log(this._router.url);
          if(this.ListSideBar.length > 0){
            let url = this._router.url;
            if(url == "/"){
              url = "/home"
            }
            let itemCheck = this.ListSideBarCheck.find(y => url.startsWith('/'+y.route));
            if(itemCheck){
              this._apiHttp.post(AppAPIConst.SYSTEM.CheckPermission,'',{
                MenuID:itemCheck.MenuID
              }).subscribe(res=>{
                if(!res.Data.OutputParams.IsView || res.Error){
                  this._router.navigate([AppRoutes.notAuthor])
                }
                else{
                  let item = this.ListSideBar.find(y => url.startsWith('/'+y.route));
                  if(item){
                    item.Icon = item.Icon.replaceAll('stroke="white"','stroke="#0174BE"')
                    this.ListSideBar.filter(x=>x.MenuID != item.MenuID).forEach(y=>{
                      y.Icon = y.Icon.replaceAll('stroke="#0174BE"','stroke="white"');
                    })
                    this.tabSelected = item.MenuID
                  }
                  else{
                    item = this.ListSideBar[0];
                    item.Icon = item.Icon.replaceAll('stroke="white"','stroke="#0174BE"')
                    this.ListSideBar.filter(x=>x.MenuID != item.MenuID).forEach(y=>{
                      y.Icon = y.Icon.replaceAll('stroke="#0174BE"','stroke="white"');
                    })
                    this.tabSelected = item.MenuID;
                  }
                }
              })
            }
            else{
              this._router.navigate([AppRoutes.notAuthor])
            }
          }
        })
      }
    })
  }
}
