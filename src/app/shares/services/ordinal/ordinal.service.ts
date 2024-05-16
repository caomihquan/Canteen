import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class OrdinalService {
  finishSideBar = new BehaviorSubject<boolean>(false);

  Coin:number = 330;

  listHistory:Array<any>= [
    {
      NgayPhatSinh:new Date().toISOString(),
      Type:1,
      Description:'',
      CreatedBy:this.auth.getUser()?.UserID,
      UserName:this.auth.getUser()?.UserName,
      Total:330,
      listFood:[
        
      ]
    }
  ]

  constructor(private auth:AuthService) {
  }


  setCoin(coin:number){
    this.Coin = coin;
  }

  AddHistory(data:any){
    this.listHistory = [...this.listHistory,data]
  }



}
