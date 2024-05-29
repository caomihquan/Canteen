import { Component } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-theo-doi-lich-su-thanh-toan',
  templateUrl: './theo-doi-lich-su-thanh-toan.component.html',
  styleUrls: ['./theo-doi-lich-su-thanh-toan.component.scss']
})
export class TheoDoiLichSuThanhToanComponent {
  heightGrid:number = fnCommon.getGridHeight();
  listHistory:Array<any> = [];
  wrapSettings = { wrapMode: 'Content' };
}
