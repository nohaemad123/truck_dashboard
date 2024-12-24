import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import { json } from 'express';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AlertService } from './alert.service';

interface API {
  data: any;
  errorMessage: string;
  isSuccess: boolean;
  statusCode: number;
  successMessage: string;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serverUrl = environment.hostAPI;
  public urlApiFile = environment.urlApiFile;

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  get<T>(APIName: string, params?: any, showAlert = true): Observable<T> {
    let queryParams: any = [];
    if (params) {
      for (const key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }

    return this.http
      .get<API>(`${this.serverUrl}${APIName}${queryParams.length>0?'?'+queryParams.join('&'):''}`)
      .pipe(
        take(1),
        map((event: any) => {
          event.showAlert = showAlert;
          showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  post<T>(APIName: string, body?: any, showAlert = true): Observable<T> {
    return this.http
      .post<API>(`${this.serverUrl}${APIName}`, body ? body : null)
      .pipe(
        take(1),
        map((event: any) => {
          event.showAlert = showAlert;
          showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  put(
    APIName: string,
    params?: any,
    body?: any,
    showAlert = true
  ): Observable<any> {
    let queryParams: any = [];
    if (params) {
      for (const key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }

    return this.http
      .put(`${this.serverUrl}${APIName}${queryParams.length>0?'?'+queryParams.join('&'):''}`, body)
      .pipe(
        take(1),
        map((event: any) => {
          event.showAlert = showAlert;
          showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }




  patch(
    APIName: string,
    params?: any,
    body?: any,
    showAlert = true
  ): Observable<any> {
    let queryParams: any = [];
    if (params) {
      for (const key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }

    return this.http
      .patch(`${this.serverUrl}${APIName}${queryParams.length>0?'?'+queryParams.join('&'):''}`, body)
      .pipe(
        take(1),
        map((event: any) => {
          event.showAlert = showAlert;
          showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }


  delete(APIName: string, params?: any, showAlert = true): Observable<any> {
    let queryParams: any = [];
    if (params) {
      for (const key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }
    }
    return this.http
      .delete(`${this.serverUrl}${APIName}${queryParams.length>0?'?'+queryParams.join('&'):''}`)
      .pipe(
        take(1),
        map((event: any) => {
          event.showAlert = showAlert;
          showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  private alertHandling(event: any) {
    console.log('event: ', event);
    if (
      event.responseCode == 0 ||
      (event.responseCode == 200 && event.showAlert)
    ) {
      // 'Successfully Done...'
      // this.alertService.success(
      //   event.successMessage
      //     ? event.successMessage
      //     : this.translateService.instant('RESPONSE_MESSAGES.SUCESSFUL_DONE')
      // );
      // if (event.responseCode.toString().startsWith('2')) {
      // } else if (event.responseCode !== 200) {
      //   this.alertService.error(event.errorMessage ? event.errorMessage : '!NOT HANDLED ERROR!');
      // }
    } else if (
      event.responseCode != 0 ||
      (event.responseCode != 200 && event.showAlert)
    ) {
      // '!NOT HANDLED ERROR!'
      this.alertService.error(
        event.responseMessage
          ? event.responseMessage
          : this.translateService.instant('RESPONSE_MESSAGES.NOT_HANDLED_ERROR')
      );
    }
  }

  uploadAttachmentWithPipe(formData: any, uploadFolderName = '') {
    let url = `${this.serverUrl}/General/UploadImages?FolderName=${uploadFolderName}`;
    return this.http.post<any>(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  uploadImageWithPipe(formData: any) {
    let url = `${this.serverUrl}/General/UploadImages`;
    return this.http.post<any>(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
