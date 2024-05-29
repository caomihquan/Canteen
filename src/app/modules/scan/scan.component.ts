import { Component, ViewChild } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {
  @ViewChild('dialog') dialog:any;
  listHistory:Array<any> = [];
  heightGrid:number = fnCommon.getGridHeight();
  wrapSettings = { wrapMode: 'Header' };

}
