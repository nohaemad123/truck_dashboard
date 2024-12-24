// import { menu } from './../../menu/old-menu';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { BehaviorSubject, Observable } from 'rxjs';
// import { coreConfig as ecommerceConfig } from 'app/app-config-ecommerce';

@Injectable({
  providedIn: 'root'
})
export class EcommercesService {

  public apiData: any;
  public onApiDataChanged: BehaviorSubject<any>;
  constructor(private _coreConfigService: CoreConfigService,private _httpClient: HttpClient) {
    // Set the defaults
    this.onApiDataChanged = new BehaviorSubject({});
  
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve() {
    setTimeout(() => {
      this._coreConfigService.setConfig({layout:{type:'ecommerce',menu:{hidden:true},footer: { hidden: false},navbar: { hidden: false}}}, { emitEvent: true });      
    }, 0);
  }

  /**
   * Get Api Data
   */
  // getApiData(): Promise<any[]> {

  //   return new Promise((resolve, reject) => {
  //     // this._coreConfigService.config = ecommerceConfig;
     
  //     this._httpClient.get('api/dashboard-data').subscribe((response: any) => {
  //       this._coreConfigService.config = ecommerceConfig;
  //       this.apiData = response;
  //       this.onApiDataChanged.next(this.apiData);
  //       resolve(this.apiData);
  //     }, reject);
  //   });
  // }
}
