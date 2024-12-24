import { Injectable } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLayoutService {

  constructor(private _coreConfigService: CoreConfigService) {
    // Set the defaults
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve() {
      this._coreConfigService.setConfig({layout:{type:'admin',menu:{hidden:true},footer: { hidden: true},navbar: { hidden: true}}}, { emitEvent: true });      
  }
}
