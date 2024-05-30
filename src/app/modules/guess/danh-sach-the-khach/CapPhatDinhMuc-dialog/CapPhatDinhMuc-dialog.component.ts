import { GuessService } from './../../services/guess.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-CapPhatDinhMuc-dialog',
  templateUrl: './CapPhatDinhMuc-dialog.component.html',
  styleUrls: ['./CapPhatDinhMuc-dialog.component.scss']
})
export class CapPhatDinhMucDialogComponent implements OnInit {

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
  protected DinhMucCongThem:number = 0;
  protected TheKhachCode:string;

  constructor(private guessService: GuessService){

  }

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

  ngOnInit(): void {
    this.totalItems = this.listSubgroup.length;
  }

  protected onBeforeOpen(event:any){
  }
  protected onSave(){
    debugger;
    var data = {
        DataRequest:{
          SoXuNapThem: this.DinhMucCongThem,
          MaTheKhach: this.TheKhachCode
        }
    }
        this.guessService.TheKhach_ThemXu(data).subscribe(res =>{
          debugger;
          if(!res.Data.Data.OutputParams.Err && !res.Data.Data.Error ){
            // const initialState = {
            //   title: this.I18nLang.Common.Alert,
            //   content:this.I18nLang.Error.NoRowSelected,
            // }
            // this.modalRef = this._modalService.show(ModalComponent,{initialState});
          }
              console.log(res);
        });
        this.ejDialog.hide();
        this.isShow = false;
  }
  LoadWithIndex(evt:any){
    debugger
    if(evt?.currentPage){
      // this.PageIndex = evt?.currentPage;
      // this.LoadListUnions();
    }
  }
  public onOpenDialog(thekhachCode:string){
      this.isShow = true;
      this.TheKhachCode = thekhachCode;
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
