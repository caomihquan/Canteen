import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiHttpService } from 'src/app/shares/services/apihttp/api-htttp.service';
@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }
  uploadVideoChunk(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('https://localhost:7093/api/video', formData);
  }


  streamVideo(fileName: string) {
    return this.http.get(`https://localhost:7093/api/video/${fileName}`, { responseType: 'blob' });
  }
}
