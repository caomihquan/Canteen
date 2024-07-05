import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  finishSideBar = new BehaviorSubject<boolean>(false);
  breadcrumb = new BehaviorSubject<any>(null);
  ListSideBar:Array<any> = [];
  ListMenuAction:Array<any> = [];
  FunctionID:string;

  constructor() {
  }

  getPermission(){
    return this.ListMenuAction.filter(x => x.FunctionID == this.FunctionID)
  }

}
