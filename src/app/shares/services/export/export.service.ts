import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/authentication.service';
import { ApiHttpService } from '../apihttp/api-htttp.service';
export class ExportModel {
  data:any
  path:string
  IsSPSS?:boolean
}
@Injectable({
  providedIn: 'root',
})
export class ExportCommonService {
  constructor(private auth:AuthService,private api:ApiHttpService) {}

  excute(model:ExportModel){
    const loginInfo = this.auth.getUser();
    model.data["Application"] = model.data["Application"] ? model.data["Application"] : 'app';
    model.data["SessionID"] = model.data["SessionID"] ? model.data["SessionID"] : loginInfo?.SessionID;
    model.data["SessionApp"] = model.data["SessionApp"] ? model.data["SessionApp"] : 'app';
    model.data["Language"] = model.data["Language"] ? model.data["Language"] : "vn";
    model.data["Token"] = model.data["Token"] ? model.data["Token"] : loginInfo?.TokenID;
    model.data["FunctionID"] = model.data["FunctionID"] ? model.data["FunctionID"] : "";
    this.api.post('export/gettoken',null,{
      Parameters: JSON.stringify(model.data)
    },true).subscribe(res =>{
      if (res && res.Data.Token) {
        this.api.post(model.path,null,{
          Token:res.Data.Token
        }).subscribe(res =>{
          if(!res.Error && res.Data){
            if(model.IsSPSS){
              this.downloadSPSS(res.Data.Data , res.Data.SheetName)
              return;
            }
            this.downloadBase64File(res.Data.Data , res.Data.SheetName);
          }
        })
      }
    })
  }

  private downloadBase64File(base64Data :any, fileName :any) {
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.target = '_blank';//target="_blank" rel="noopener noreferrer" , target='_self'
    downloadLink.download = fileName;
    downloadLink.click();
  }

  private downloadSPSS(base64String :any, fileName :any){
    const anchorElement = document.createElement('a');
    const mimeType = 'application/octet-stream';
    anchorElement.href = `data:${mimeType};base64,${base64String}`
    anchorElement.target = '_blank'
    anchorElement.download = `${fileName}.sav`;
    anchorElement.click();

  }
}
