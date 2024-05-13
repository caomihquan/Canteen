import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from 'src/app/shares/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let loadding = false;
    try {
      const string = window.decodeURIComponent(request.body?.toString() ?? '').split('&')[0] ?? ''
      const jsonStartIndex = string.indexOf('{');
      const jsonString = string.substring(jsonStartIndex);
      const jsonParse = JSON.parse(jsonString)
      loadding = jsonParse.Loading
    } catch (error) {
      loadding = false;
    }

    if(loadding){
      this.busyService.busy();
    }
    return next.handle(request).pipe(
      catchError(err =>{
        if(loadding){
          this.busyService.idle();
        }
        return throwError(()=>err.Message)
      }),
      finalize(() => {
        if(loadding){
          this.busyService.idle();
        }
      })
    )
  }
}
