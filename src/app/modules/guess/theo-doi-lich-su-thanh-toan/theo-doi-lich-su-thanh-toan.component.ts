import { Component, OnInit } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';
import { GuessService } from '../services/guess.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';

@Component({
  selector: 'app-theo-doi-lich-su-thanh-toan',
  templateUrl: './theo-doi-lich-su-thanh-toan.component.html',
  styleUrls: ['./theo-doi-lich-su-thanh-toan.component.scss']
})
export class TheoDoiLichSuThanhToanComponent implements OnInit {
  heightGrid:number = fnCommon.getGridHeight();
  // listHistory:Array<any> = [];
  wrapSettings = { wrapMode: 'Content' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  LSitems:any[] =[];
  constructor(private guessService:GuessService){

  }
  ngOnInit(): void {
      this.initData();
  }

  initData(){
    var data = {
      Option: 8,
      SearchText: '',
      PageIndex: this.PageIndex,
      PageSize: this.PageSize
    }
      this.guessService.TheKhach_TheoDoiLSTT(data).subscribe((res) => {
            if(res.Data.Data.length > 0){
              this.LSitems = res.Data.Data;

            }
            else{
              this.LSitems = [];
            }

      });
  }


}
