import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string;
  @Input() content: string;
  @Input() textYes:string;
  @Input() textNo:string;
  @Input() fnYes:Function;
  @Input() fnNo:Function;
}
