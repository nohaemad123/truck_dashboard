import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoreConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /**
      * @param {CoreConfigService} _coreConfigService
     */
  constructor(private _toastrService: ToastrService, private translate: TranslateService, private _coreConfigService: CoreConfigService) { }
  currenctLang: any = this._coreConfigService.getConfigAppLanguage();


  success(message: string) {
    this._toastrService.success(this.translate.instant(message), '',
      {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
  }

  info(message: string) {
    this._toastrService.info(this.translate.instant(message), '',
      {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
  }
  warning(message: string) {
    this._toastrService.warning(this.translate.instant(message), '',
      {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
  }

  error(message: string) {
    console.log("🚀 ~ error ~ message", message)

    this._toastrService.error(message, '',
      {
        toastClass: 'toast ngx-toastr',
        closeButton: true,
        positionClass: 'toast-top-right'
      });
  }
}
