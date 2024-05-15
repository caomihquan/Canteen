import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdinalService {
  finishSideBar = new BehaviorSubject<boolean>(false);
  Coin:number = 330;
  constructor() {
  }


  setCoin(coin:number){
    this.Coin = coin;
  }



}
