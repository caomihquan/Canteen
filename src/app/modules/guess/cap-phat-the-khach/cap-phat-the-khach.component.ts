import { Component } from '@angular/core';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-cap-phat-the-khach',
  templateUrl: './cap-phat-the-khach.component.html',
  styleUrls: ['./cap-phat-the-khach.component.scss']
})
export class CapPhatTheKhachComponent {
  wrapSettings = { wrapMode: 'Content' };
  heightGrid = fnCommon.getGridHeight();
  listCapPhat:Array<any> = []
}
