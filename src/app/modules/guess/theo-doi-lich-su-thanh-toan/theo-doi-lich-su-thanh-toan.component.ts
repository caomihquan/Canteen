import { Component, OnInit } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';
import { GuessService } from '../services/guess.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
import { AppAPIConst } from 'src/app/shares/constants/AppApiConst';

@Component({
  selector: 'app-theo-doi-lich-su-thanh-toan',
  templateUrl: './theo-doi-lich-su-thanh-toan.component.html',
  styleUrls: ['./theo-doi-lich-su-thanh-toan.component.scss']
})
export class TheoDoiLichSuThanhToanComponent implements OnInit {
  heightGrid:number = fnCommon.getGridHeight();
  listHistory:Array<any> = [];
  wrapSettings = { wrapMode: 'Content' };
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  SearchText:string;
  I18nLang:any
  totalItem:number = 0;
  constructor(private langS:LanguageService,private _api:ApiHttpService){
    this.I18nLang = this.langS.I18LangService
  }


  ngOnInit(): void {
  }


  ViewData(){
    this.PageIndex = 0
    this.getLichSuThanhToan();
  }


  ClickPage(page:any){
    this.PageIndex = page
    this.getLichSuThanhToan();
  }
  getLichSuThanhToan(){
    this._api.post(AppAPIConst.TheKhach.thekhach_spLichSuThanhToan,{
      PageIndex:this.PageIndex,
      PageSize:this.PageSize,
      SearchText:this.SearchText
    }).subscribe(res=>{
      console.log(res);
      this.listHistory = res.Data.Data;
      this.totalItem = res.Data.OutputParams.TotalItems;
    })
  }



}
