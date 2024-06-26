import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-add-new-emp-dialog',
  templateUrl: './add-new-emp-dialog.component.html',
  styleUrls: ['./add-new-emp-dialog.component.scss']
})

export class AddNewEmpDialogComponent implements OnInit {

  @Output() SaveDialog = new EventEmitter<any>()
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
  stringImage:any;
  
  donGia:number = 0;
  employeeModel = {
    EmployeeCode: '',
    EmployeeName:'',
    BarCode:'',
    JoinDate: new Date().toISOString()
  }

  constructor(){

  }
  selectImage(event:any){
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        if(file.type != "image/jpeg" && file.type != "image/png" &&  file.type != "image/jpg")
        {
          alert('chỉ hỗ trợ ảnh jpg, jpeg hoặc png');
        }
        else
        {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.stringImage = reader.result;
            let base64str = this.stringImage.split("base64,").length > 1 ? this.stringImage.split("base64,")[1] : "";     //
            // this.Union.fileName = file.name;
            // this.Union.fileType= file.type;
            // this.Union.fileSize=file.size;
            // this.Union.filedata=base64str;
            // this.Union.fileID= fnCommon.uuidv4();
          }
        }

      }
    }
  }

  // selectImage(event:any){

  // }
  ngOnInit(): void {

  }

  protected onBeforeOpen(event:any){
      // event.maxHeight = '100vh'
  }

  public onOpenDialog(employee?:any){
    this.employeeModel = employee;
    this.isShow = true;
    if(this.isShow){
      this.ejDialog?.show();
    }
  }

  Save(){
    this.SaveDialog.emit(this.employeeModel);
    this.ejDialog.hide();
    this.employeeModel = {
      EmployeeCode: '',
      EmployeeName:'',
      BarCode:'',
      JoinDate: new Date().toISOString()
    }
  }



}
