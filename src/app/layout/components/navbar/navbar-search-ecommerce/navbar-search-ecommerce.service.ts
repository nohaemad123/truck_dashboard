import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEcommerceService {
  // Public
  public search = '';
  public apiData = [];
  public onApiDataChange: BehaviorSubject<any>;
  public onIsBookmarkOpenChange: BehaviorSubject<any>;
  public searchText: BehaviorSubject<string>;

  /**
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    this.onApiDataChange = new BehaviorSubject('');
    this.searchText = new BehaviorSubject('');
    this.onIsBookmarkOpenChange = new BehaviorSubject(false);
    this.getSearchData();
  }

searchTerm(term:string){
  this.searchText.next(term)
}
  /**
   * Get Search Data
   */
  getSearchData(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/search-data').subscribe((response: any) => {
        this.apiData = response;
        this.onApiDataChange.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}
