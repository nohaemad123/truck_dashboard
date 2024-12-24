import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Products } from './products.model';
const API_URL = `${environment.ecommerce_URL}`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public apiData: any;
  public onApiDataChanged: BehaviorSubject<any>;

  /**
    * Constructor
    *
    * @param {HttpClient} _httpClient
    */
  constructor(private _httpClient: HttpService) {
    // Set the defaults
    this.onApiDataChanged = new BehaviorSubject({});
  }

  // /**
  //  * Resolver
  //  *
  //  * @param {ActivatedRouteSnapshot} route
  //  * @param {RouterStateSnapshot} state
  //  * @returns {Observable<any> | Promise<any> | any}
  //  */
  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
  //   return new Promise<void>((resolve, reject) => {
  //     Promise.all([this.getAllProducts()]).then(() => {
  //       resolve();
  //     }, reject);
  //   });
  // }

  // getAllProducts(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`/GetAllProducts?page=1&limit=10`).subscribe((response: any) => {
  //       this.apiData = response;
  //       this.onApiDataChanged.next(this.apiData);
  //       resolve(this.apiData);
  //     }, reject);
  //   });
  // }

  getAllProducts(): Observable<Products[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<Products[]>(`/Products/GetAllProducts?page=1&limit=50`, {}, false).pipe(map((o: any) => {
      console.log("o: ", o)
      // o=o.data.items.map((e:Products)=>{
      //   console.log("e: ", e)
      //   e.firstImage = e?.productImages[0]?.imageProduct??null
      //   e.category_name = e?.subCategories.name??null
      // })
      // let productData = o.data.items
      o.items.forEach((e: any) => {
        console.log("e: ", e)
        e.firstImage = e?.productImages[0]?.imageProduct ?? ''
        for (let i = 0; i < e.subCategories.length; i++) {
          e.category_name = e?.subCategories[i].name ?? ''
          console.log("o: ", e.category_name)
        }

      })
      return o
    }))
    // });
  }

  getAllCategories(): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/Cagtgories/GetAllCagtgories?page=1&limit=10`, {}, false)
    // });
  }

  getAllTags(): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/Tag/GetAllTags?page=1&limit=10`, {}, false)
    // });
  }

  getAllTax(): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/Tax/GetAllTaxes?page=1&limit=10`, {}, false)
    // });
  }

  getAllSubCategories(category_id: any): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/SubCategories/GetSubCategoryByCategoryId?CategoryId=${category_id}&page=1&limit=10`, {}, false)
    // });
  }

  getSubCategoryById(subcategory_id: any): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/SubCategories/GetSubCategoryById?Id=${subcategory_id}`, {}, false)
    // });
  }

  getAllBrands(): Observable<any[]> {
    // return new Promise((resolve, reject) => {
    return this._httpClient.get<any[]>(`/Brands/getAllBrands?page=1&limit=10`, {}, false)
    // });
  }

  deleteProduct(id: any): Observable<any> {
    return this._httpClient.delete(`/Products?id=${id}`, {})
  }

  addImage(Image: any): Observable<any> {
    return this._httpClient.uploadAttachmentWithPipe(Image, "Products");
  }

  addProduct(product: any): Observable<any> {
    return this._httpClient.post(`/Products/AddProduct`, product)
  }

  editProduct(id, product: any): Observable<any> {
    return this._httpClient.put(`/Products/UpdateProduct/${id}`, {}, product)
  }

  getProduct(id): Observable<any> {
    return this._httpClient.get(`/Products/GetProductById?id=${id}`, {}, false)
  }
}
