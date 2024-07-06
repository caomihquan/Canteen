import { Injectable } from '@angular/core';
import { ApiHttpService } from '../apihttp/api-htttp.service';
export class MultiProcessModel {
  fnSucess:Function
  ProcessName:string
}
@Injectable({
  providedIn: 'root'
})
export class MultiProcessService {

  constructor(
    private api:ApiHttpService,
  ) {}


  excute(model:MultiProcessModel){
    var body = document.getElementById("dialog-percent")
    if(body){
      body.style.display = 'block'
    }
    setTimeout(() => {
      this._fnGetDataProcess(model)
    }, 100);
  }


  private _fnGetDataProcess(model:MultiProcessModel) {
    this.api.post('multiprocess/getinfo',null,{
      ProcessName: model.ProcessName
    }).subscribe((data)=>{
      if (data) {
        this._fnSetDataProcess(data.Data,model);
        if (!this._isDoneProcess(data.Data)) {
            setTimeout(()=>{
              this._fnGetDataProcess(model)
            }, 100);
        }
      }
    })
  }


  private _fnSetDataProcess(dataProcess:any,model:MultiProcessModel){
    if (Array.isArray(dataProcess)) {
        // $dlg.height(96 + dataProcess.length * 40);

        // var $body = $dlg.find(".z-body");
        // $body.empty();

        //[{"IsDone":true,"Percent":100,"State":2,"Error":null}]
        var bodyModal = document.querySelector('.z-body');
        dataProcess.forEach(v=>{
          var processTemplate = '' +
                '<div class="progress">' +
                '    <div class="progress-bar" role="progressbar" aria-valuenow="' + v.Percent + '" aria-valuemin="0" aria-valuemax="100" style="width:' + v.Percent + '%">' +
                '        ' + v.Percent + '%' +
                '    </div>' +
                '</div>';
            if(bodyModal){
              bodyModal.innerHTML = processTemplate;
            }
        })
        setTimeout(() => {
            if (this._isDoneProcess(dataProcess)) {
              var modal = document.getElementById("dialog-percent")
              if(modal){
                modal.style.display = 'none'
              }
              if (model.fnSucess) {
                model.fnSucess();
              }
            }
        }, 300);
    }
  }

  _getTemplate = function (title:string) {
    return '' +
        '<div id="dialog-percent">' +
        '    <div class="z-modal-dialog">' +
        '        <div class="z-content">' +
        '            <div class="z-header">' +
        '                <span class="z-title">' + title + '</span>' +
        '            </div>' +
        '            <div class="z-body">' +
        '                ' +
        '            </div>' +
        '            <div class="z-footer">' +
        '                <div class="z-toolbar" id="zToolbar"></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';
  }

  private _isDoneProcess(dataProcess:any){
    if(Array.isArray(dataProcess)){
      let iProcessDone = dataProcess.filter((d:any) => {
        return d.Percent == 100 || d.IsDone;
      });
      return iProcessDone.length === dataProcess.length;
    }
    return false
  }

}
