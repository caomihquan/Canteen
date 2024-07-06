import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';
import { ApiHttpService } from '../apihttp/api-htttp.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ExportCommonService } from '../export/export.service';
import { SideBarService } from '../sidebar/sidebar.service';
import { MultiProcessService } from '../multi-process/multi-process.service';

export class ImportModel {
  ImportKey:string
  FileName:string
  FileSize: any
  FileType: any
  FileContent: any
  TypeCode:string
  path?:string = "dll/c/import/table"
  data?:any;
}
@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(
    private auth:AuthService,
    private api:ApiHttpService,
    private noti:NotificationService,
    private _export:ExportCommonService,
    private _sideBar:SideBarService,
    private _multiProcess:MultiProcessService
  ) {}

  private fnDone(model:ImportModel){
    this.api.post("HrmMobileApp/CnB/table/get",null,{
      ImportKey: model.ImportKey,
    }).subscribe(res=>{
      if(res.Data.IsHasError){
        this.noti.Confirm({
          title:'Thông báo',
          content:'Đã có lỗi xảy ra, bạn có muốn xuất khẩu file lỗi?',
          OkFunction:() =>{
            this._export.excute({
              data:{
                IsMultisheet: false,
                ImportKey: model.ImportKey,
                ApiPath:"HrmMobileApp/CnB/table/post",
                TypeCode: model.TypeCode,
                FunctionID:this._sideBar.FunctionID
              },
              path:'export/importerror'
            })
          }
        })
      }
      else{
        if(model.data?.callBack){
          model.data?.callBack();
        }
        this.noti.ShowToastSuccess("Nhập khẩu thành công")
      }
    })
  }

  private excute(model:ImportModel){
    this.api.post("HrmMobileApp/CnB/table/post",'',model,true)
      .subscribe(res =>{
        if(res && res.Data){
          if(res.Data.Error){
            this.noti.ShowToastError(res.Data.Error);
            return;
          }
          this._multiProcess.excute({
            ProcessName:model.ImportKey,
            fnSucess:()=>{
              this.fnDone(model)
            }
          })
        }
      })
  }

  selectFileImport(event:any,data:any){
    const loginInfo = this.auth.getUser();
    event.preventDefault();
    let files = event.target.files;
    if (files.length > 0) {
      let file = files[0]
      let reader = new FileReader();
      reader.onload = () => {
      if(reader.result){
        var array = new Uint8Array(reader.result  as ArrayBuffer);
        var _arrayBufferToBase64 = function (buffer: any) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
        var _binaryData = _arrayBufferToBase64(array);
        var randomKey = "import_" + loginInfo?.SessionID ?? '' + "_" + Math.random().toString(36).replace(/[^a-z]+/g, '');
        this.excute({
            ImportKey: randomKey,
            FileName: file.name,
            FileSize: file.size,
            FileType: file.type,
            FileContent: _binaryData,
            TypeCode: data.TypeCode ?? "",
            data:data
        })
      }
    }
    reader.readAsArrayBuffer(file);
    }
  }
}
