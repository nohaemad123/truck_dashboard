import { Injectable } from '@angular/core';
import { ISelectItem } from '@core/models/select-item.model';
import { HttpService } from '@core/services/http.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL = `${environment.ecommerce_URL}/ListOfValues`;

@Injectable({
  providedIn: 'root'
})
export class ListOfValuesService {

  constructor(private _httpService: HttpService) { }


  getCategories(): Observable<ISelectItem[]> {
    return this._httpService.get<ISelectItem[]>(`/ListOfValues/getCategories`,{},false)
  }

  getSubCategories(CategoryId: number): Observable<ISelectItem[]> {
    return this._httpService.get<ISelectItem[]>(`/ListOfValues/getSubCategories?CategoryId=${CategoryId}`,{},false)
  }

  getBrands(): Observable<ISelectItem[]> {
    return this._httpService.get<ISelectItem[]>(`/ListOfValues/getBrands`,{},false)
  }

  getProductsAutoComplete(term: string): Observable<ISelectItem[]> {
    return this._httpService.get<ISelectItem[]>(`${API_URL}/getProductsAutoComplete`)
  }
}
