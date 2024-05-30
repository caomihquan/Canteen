import { Component, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-addnew-dialog',
  templateUrl: './addnew-dialog.component.html',
  styleUrls: ['./addnew-dialog.component.scss']
})
export class AddnewDialogComponent {
  @ViewChild('ejDialog2') ejDialog: DialogComponent;
  protected isShow:boolean = false;
  height:number = 714 - 300;
  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;
  totalPages:number = 0;
  PageSize: number = 10;
  totalItems:number = 0;
  selectPhanLoai:any;
  tennhom:string;
  moTa:string;
  donGia:number = 0;
  listSubgroup = [
    {
      UpdatedDate: new Date(),
      Name: 'Lê Phạm Hoài Thương',
      EmployeeCode: 'TW0001',
      Content:'Thay đổi Hạn mức sử dụng/ngày từ 100.000VND thành 125.000VND'
    },
    {
      UpdatedDate: new Date(),
      Name: 'Lê Phạm Hoài Thương',
      EmployeeCode: 'TW0001',
      Content:'Thay đổi Hạn mức sử dụng/ngày từ 100.000VND thành 125.000VND'
    },
    {
      UpdatedDate: new Date(),
      Name: 'Lê Phạm Hoài Thương',
      EmployeeCode: 'TW0001',
      Content:'Thay đổi Hạn mức sử dụng/ngày từ 100.000VND thành 125.000VND'
    },
    {
      UpdatedDate: new Date(),
      Name: 'Lê Phạm Hoài Thương',
      EmployeeCode: 'TW0001',
      Content:'Thay đổi Hạn mức sử dụng/ngày từ 100.000VND thành 125.000VND'
    },
  ]
  constructor(){

  }
  ngOnInit(): void {
    this.totalItems = this.listSubgroup.length;
  }

  protected onBeforeOpen(event:any){
      // event.maxHeight = '100vh'
  }
  LoadWithIndex(evt:any){
    debugger
    if(evt?.currentPage){
      // this.PageIndex = evt?.currentPage;
      // this.LoadListUnions();
    }
  }
  public onOpenDialog(){
      this.isShow = true;
      if(this.isShow){
        this.ejDialog.show();
      }
  }
  ListPhanLoai = [
    {
      ID:1,
      Name:"Món ăn chính"
    },
    {
      ID:2,
      Name:"Món ăn phụ"
    },
    {
      ID:1,
      Name:"Tráng miệng"
    }
  ]
  protected selectedRowTable(event:any){

  }
}
