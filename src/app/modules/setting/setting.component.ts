import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, signal } from '@angular/core';
import { OrdinalService } from 'src/app/shares/services/ordinal/ordinal.service';
import { AppCommon } from 'src/app/shares/constants/AppCommon';
import { LanguageService } from 'src/app/shares/services/language/language.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';
import { TranslateService } from '@ngx-translate/core';
import { VideoService } from './services/setting.service';
import { fnCommon } from 'src/app/shares/helpers/common';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit,AfterViewInit {
  selectedDate = new Date().toISOString()
  PageIndex:number = AppCommon.PageIndex;
  PageSize:number = AppCommon.PageSize;
  totalItems:number;
  height:number = (window.innerHeight - 202)
  widthRight = window.innerWidth - 350;
  I18nLang:any

  public sortOptions?: object;
  public pageSettings?: PageSettingsModel;

  selectedTabs = signal(0);

  selectedFile: File;
  uploadProgress = 0;


  @ViewChild('videoPlayer',{static:true}) videoPlayer: ElementRef;
  video:any;

  constructor(
    private _ordinal:OrdinalService,
    private _languageService:LanguageService,
    private _translate:TranslateService,
    private videoService: VideoService
    ){
      this.I18nLang = this._languageService.I18LangService;
  }


  ngAfterViewInit() {
    // this.videoService.streamVideo('cmquan.mp4').subscribe(data => {
    //   if(data){
    //     const blob = new Blob([data], { type: 'video/mp4' });
    //     const url = window.URL.createObjectURL(blob);
    //     this.videoPlayer.nativeElement.src = url;
    //     this.video = url;
    //   }
    // });
  }
  ngOnInit() {

  }



  RegisterCardForCustomer(){

  }

  selectedRowTable(evt:any){
    const item = evt.rowData
  }



  GetMenu(){

  }

  onSearch(event:KeyboardEvent){
    if(event.key == 'Enter'){
      this.ResetModel();
      this.GetMenu();
    }
  }



  ClickPagerIndex(evt:any){
    if(evt?.currentPage){
      this.PageIndex = evt?.currentPage - 1
      this.GetMenu();
    }
  }

  ResetModel(){
    this.PageIndex = AppCommon.PageIndex;
    this.PageSize = AppCommon.PageSize;
    this.totalItems = 0;
  }


  getPhoto(userid:string){
    return fnCommon.ConvertPhotoEmpByUserID(userid)
  }

  ClickTabs(tab:number){
    this.selectedTabs.set(tab);
  }


  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadVideo() {
    if (!this.selectedFile) {
      return;
    }

    // const chunkSize = 1024 * 1024; // 1 MB chunks
    // const totalChunks = Math.ceil(this.selectedFile.size / chunkSize);
    // var filename = "cmquan" + ".mp4";
    // for (let i = 0; i < totalChunks; i++) {
    //   const chunk = this.selectedFile.slice(i * chunkSize, (i + 1) * chunkSize);
    //   this.uploadProgress = (i + 1) / totalChunks * 100;
    // }

    var a = await this.videoService.uploadVideoChunk(this.selectedFile);
    a.subscribe();

  }

   streamVideo(fileName: string) {
    this.videoService.streamVideo(fileName).subscribe(videoBlob=>{
      if(videoBlob){
        const videoUrl = URL.createObjectURL(videoBlob);
        this.videoPlayer.nativeElement.src = videoUrl;
        this.videoPlayer.nativeElement.load();
        this.videoPlayer.nativeElement.play();
      }
    });

  }

}
