import { GuessService } from './../../services/guess.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/shares/components/modal/modal.component';
import { LanguageService } from 'src/app/shares/services/language/language.service';

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
  modalRef: BsModalRef
  I18nLang:any
  @Output() reloadDataMasterEvent: EventEmitter<any> = new EventEmitter();
  protected DinhMucCongThem:number = 0;
  protected TheKhachCode:string;

  constructor(private guessService: GuessService
              ,private _languageService: LanguageService
              ,  private _modalService: BsModalService,

  ){

  }



  ngOnInit(): void {
    // this.totalItems = this.listSubgroup.length;
    this.getLanguage();
  }
  getLanguage = async()=>{
    this.I18nLang = await this._languageService.getLanguage();
  }
  protected onBeforeOpen(event:any){
    debugger;
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
          if(!res.Data.OutputParams.Err && !res.Data.Error ){
            const initialState = {
              title: this.I18nLang.Common.Alert,
              content: 'Cấp phát định mức thành công',
            }
            this.modalRef = this._modalService.show(ModalComponent,{initialState});
            this.DinhMucCongThem = 0;
            this.ejDialog.hide();
            this.reloadDataMasterEvent.emit(true);
            this.isShow = false;
          }
          else{
            this.reloadDataMasterEvent.emit(false);
          }
              // console.log(res);

        });

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
        this.ejDialog?.show();
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
