import { Component, OnInit } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';
import { GuessService } from '../services/guess.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';

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

  constructor(private langS:LanguageService){
    this.I18nLang = this.langS.I18LangService
  }


  ngOnInit(): void {

  }
  ViewData(){

  }




}
