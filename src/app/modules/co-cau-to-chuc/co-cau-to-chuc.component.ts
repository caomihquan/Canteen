import { Component, OnInit } from '@angular/core';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';
import { fnCommon } from 'src/app/shares/helpers/common';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';

@Component({
  selector: 'app-co-cau-to-chuc',
  templateUrl: './co-cau-to-chuc.component.html',
  styleUrls: ['./co-cau-to-chuc.component.scss']
})
export class CoCauToChucComponent implements OnInit {

  height:number = window.innerHeight
  tabSelected:any
  listDepartment:Array<any> = []
  getPhoto = fnCommon.ConvertPhotoEmpByUserID;

  constructor(private _api:ApiHttpService){}

  ngOnInit(): void {
    this.getCoCauToChuc();
  }

  ToggleTabs(item:any){
    // if(item.Children.length == 0){

    // }
    this.tabSelected = item

  }


  getCoCauToChuc(){
    this._api.post(AppAPIConst.CoCauToChuc.Departments_get).subscribe(res=>{
      this.listDepartment = this.InitNested(res.Data.Data,null);
      console.log(this.listDepartment);
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
}
