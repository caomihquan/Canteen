import { Injectable } from '@angular/core';
import { ToastComponent, ToastUtility } from '@syncfusion/ej2-angular-notifications';
import { DialogUtility } from '@syncfusion/ej2-angular-popups';

class ConfirmModel{
  title:string;
  content:string;
  OkFunction:Function;
  textOK?:string;
  CancelFunction?:Function;
  textCancel?:string
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  confirmDialog: any;
  constructor() { }

  ShowToastError(content:string | null,duration:number = 3000): void {
    const toast = ToastUtility.show({
        content:content ?? '',
        timeOut: duration,
        position: { X: 'Center', Y: 'Top' },
        cssClass:"toast-error",
        icon:'bi bi-x-circle'
    }) as ToastComponent;
  }
  ShowToastSuccess(content:string,duration:number = 3000): void {
    const toast = ToastUtility.show({
        content:content,
        timeOut: duration,
        position: { X: 'Center', Y: 'Top' },
        cssClass:"toast-success",
        icon:'bi bi-check-circle-fill',

    }) as ToastComponent;
  }

  Alert = (params:ConfirmModel): void => {
    this.confirmDialog = DialogUtility.alert({
     title: params.title,
     content: params.content,
     okButton: params.OkFunction ? {  text: params.textOK ?? 'OK', click: () =>{
       params.OkFunction();
       this.confirmDialog.hide();
      }} : undefined,
     showCloseIcon: true,
     closeOnEscape: true,
     animationSettings: { effect: 'Zoom' }
    });
  }

  Confirm = (params:ConfirmModel): void => {
    this.confirmDialog =  DialogUtility.confirm({
      title:params.title ?? 'Thông báo',
      content:params.content,
      okButton: {  text: params.textOK ?? 'Đồng ý', click: () => {
        params.OkFunction();
        this.confirmDialog.hide();
      }},
      cancelButton: {  text: params.textCancel ?? 'Huỷ bỏ', click: () => {
        params.CancelFunction ? params.CancelFunction() : undefined
          this.confirmDialog.hide();
        }
      },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: 'Zoom' }
    });
  }
}
