import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthenticationService } from 'app/auth/service';
import { AlertService } from '@core/services/alert.service';
import { CoreConfigService } from '@core/services/config.service';
import { EventBusService, EventData } from '@core/services/event-bus.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  /**
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   * @param {AlertService} _alertService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService, private eventBusService: EventBusService, private _alertService: AlertService, private _coreConfigService: CoreConfigService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        console.log("error:", err)
        if ([401].indexOf(err.status) !== -1) {
          return this.handle401Error(request, next);
        } else
          if ([403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this._router.navigate(['/pages/miscellaneous/not-authorized']);
            const error = err.error.message || err.statusText;
            return throwError(error);
          } else {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 500 || err.status === 502 || err.status === 503) {
                this._alertService.error(err.error ? err.error.errorMessage ? err.error.errorMessage : '!Technical Error!' : '!Technical Error!');
              } else if (err.status === 400) {
                this._alertService.error(err.error.responseMessage ? err.error.responseMessage : err.error.title);
              } else if (err.status === 404) {
                this._alertService.error(err.error ? err.error.errorMessage ? err.error.errorMessage : '!METHOD NOT FOUND!' : '!METHOD NOT FOUND!');
              } else if (err.status === 301) {
                let currenctLang: any = this._coreConfigService.getConfigAppLanguage();
                this._authenticationService.logout();
                this._alertService.error(currenctLang === 'ar' ? 'تم انتهاء صلاحيه الجلسة برجاء التسجيل مجددا' : 'The session has expired, please register again');
                this._router.navigate(['/pages/miscellaneous/not-authorized']);
              }
              else {
                this._alertService.error(err.error ? err.error.errorMessage ? err.error.errorMessage : '!SYSTEM ERROR!' : '!SYSTEM ERROR!');
              }

            }

            return throwError(err);
          }








        // if ([401, 403].indexOf(err.status) !== -1) {
        //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        //   this._router.navigate(['/pages/miscellaneous/not-authorized']);

        //   // ? Can also logout and reload if needed
        //   // this._authenticationService.logout();
        //   // location.reload(true);
        // }
        // // throwError
        // const error = err.error.message || err.statusText;
        // return throwError(error);
      })
    );
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this._authenticationService.refreshToken().pipe(
        switchMap((data) => {
          this.isRefreshing = false;
          this._authenticationService.saveToken(data.accessToken,data.refreshToken)
          this.addTokenHeader(request,data.accessToken)
          return next.handle(request);
        }),
        catchError((error) => {
          this.isRefreshing = false;

          if (error.status == '403') {
            this.eventBusService.emit(new EventData('logout', null));
          }

          return throwError(() => error);
        })
      );
    }

    return next.handle(request);
  }
  
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */         

    return request.clone({ headers: request.headers.set('Authorization',  `Bearer ${token}`) });
  }

}
