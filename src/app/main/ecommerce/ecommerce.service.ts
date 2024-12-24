import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
const API_URL = `${environment.ecommerce_URL}`;

@Injectable({
  providedIn: 'root'
})
export class EcommerceService implements Resolve<any> {
  // Public
  public productList: Array<any>;
  public categoryList: Array<any>;
  public brandList: Array<any>;
  public wishlist: Array<any>;
  public cartList: Array<any>;
  public selectedProduct;
  public relatedProducts;

  public onProductListChange: BehaviorSubject<any>;
  public onCategoryListChange: BehaviorSubject<any>;
  public onBrandListChange: BehaviorSubject<any>;
  public onRelatedProductsChange: BehaviorSubject<any>;
  public onWishlistChange: BehaviorSubject<any>;
  public onCartListChange: BehaviorSubject<any>;
  public onSelectedProductChange: BehaviorSubject<any>;

  // Private
  private idHandel;
  private query={};

  private sortRef = key => (a, b) => {
    const fieldA = a[key];
    const fieldB = b[key];

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }
    return comparison;
  };

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient, private _httpService: HttpService) {
    this.onProductListChange = new BehaviorSubject({});
    this.onCategoryListChange = new BehaviorSubject({});
    this.onBrandListChange = new BehaviorSubject({});
    this.onRelatedProductsChange = new BehaviorSubject({});
    this.onWishlistChange = new BehaviorSubject({});
    this.onCartListChange = new BehaviorSubject({});
    this.onSelectedProductChange = new BehaviorSubject({});

  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.idHandel = route.params.id;
    let arr = [this.getProducts(), this.getWishlist(), this.getCartList(),this.getCategories(),this.getBrands()];
    if (this.idHandel)
      arr.push(this.getSelectedProduct())
    return new Promise<void>((resolve, reject) => {
      Promise.all(arr).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get Products
   */
  getProducts(query?:any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpService.post('/Products/GetStoreProducts?page=1&limit=100', query??{}).subscribe((response: any) => {
        this.productList = response;
        this.onProductListChange.next(this.productList);

        // this.sortProduct('featured'); // Default shorting
        resolve(this.productList);
      }, reject);
    });
  }
  // [
  //   {
  //     "id": 0,
  //     "name": "string",
  //     "logo": "string",
  //     "subCategories": [
  //       {
  //         "value": 0,
  //         "name": "string"
  //       }
  //     ]
  //   }
  // ]
  getCategories(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpService.get('/Cagtgories/GetStoreCategories').subscribe((response: any) => {
        this.categoryList = response?.splice(0,6);
        this.onCategoryListChange.next(this.categoryList);
        resolve(this.categoryList);
      }, reject);
    });
  }
  getBrands(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpService.get('/Brands/getAllBrands?page=1&limit=10').subscribe((response: any) => {
        this.brandList = response.items;
        this.onBrandListChange.next(this.brandList);
        resolve(this.brandList);
      }, reject);
    });
  }

  /**
   * Get Wishlist
   */
  getWishlist(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/ecommerce-userWishlist').subscribe((response: any) => {
        this.wishlist = response;
        this.onWishlistChange.next(this.wishlist);
        resolve(this.wishlist);
      }, reject);
    });
  }

  /**
   * Get CartList
   */
  getCartList(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/ecommerce-userCart').subscribe((response: any) => {
        this.cartList = response;

        this.onCartListChange.next(this.cartList);
        resolve(this.cartList);
      }, reject);
    });
  }

  /**
   * Get Selected Product
   */
  getSelectedProduct(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpService.get('/Products/GetProductById?id=' + this.idHandel).subscribe((response: any) => {
        this.selectedProduct = response;
        this.onSelectedProductChange.next(this.selectedProduct);
        resolve(this.selectedProduct);
      }, reject);
    });
  }

  /**
   * Get Related Products
   */
  getRelatedProducts(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/ecommerce-relatedProducts').subscribe((response: any) => {
        this.relatedProducts = response;
        this.onRelatedProductsChange.next(this.relatedProducts);
        resolve(this.relatedProducts);
      }, reject);
    });
  }

  /**
   * Sort Product
   *
   * @param sortBy
   */
  sortProduct(sortBy) {
    let sortDesc = false;

    const sortByKey = (() => {
      if (sortBy === 'price-desc') {
        sortDesc = true;
        return 'price';
      }
      if (sortBy === 'price-asc') {
        return 'price';
      }
      sortDesc = true;
      return 'id';
    })();

    const sortedData = this.productList.sort(this.sortRef(sortByKey));
    if (sortDesc) sortedData.reverse();
    this.productList = sortedData;
    this.onProductListChange.next(this.productList);
  }

  /**
   * Add In Wishlist
   *
   * @param id
   */
  addToWishlist(id) {
    return new Promise<void>((resolve, reject) => {
      const lengthRef = this.wishlist.length + 1;
      const wishRef = { id: lengthRef, productId: id };

      this._httpClient.post('api/ecommerce-userWishlist/' + lengthRef, { ...wishRef }).subscribe(response => {
        this.getWishlist();
        resolve();
      }, reject);
    });
  }

  /**
   * Remove From Wishlist
   *
   * @param id
   */
  removeFromWishlist(id) {
    const indexRef = this.wishlist.findIndex(wishlistRef => wishlistRef.productId === id); // Get the index ref
    const indexId = this.wishlist[indexRef].id; // Get the product wishlist id from indexRef
    return new Promise<void>((resolve, reject) => {
      this._httpClient.delete('api/ecommerce-userWishlist/' + indexId).subscribe((response: any) => {
        this.getWishlist();
        resolve();
      }, reject);
    });
  }

  /**
   * Add In Cart
   *
   * @param id
   */
  addToCart(id) {
    return new Promise<void>((resolve, reject) => {
      const maxValueId = Math.max(...this.cartList.map(cart => cart.id), 0) + 1;
      const cartRef = { id: maxValueId, productId: id, qty: 1 };
      var cartId: any = '';

      // If cart is not Empty
      if (maxValueId !== 1) {
        cartId = maxValueId;
      }
      this._httpClient.post('api/ecommerce-userCart/' + cartId, { ...cartRef }).subscribe(response => {
        this.getCartList();
        resolve();
      }, reject);
    });
  }

  /**
   * Remove From Cart
   *
   * @param id
   */
  removeFromCart(id) {
    const indexRef = this.cartList.findIndex(cartListRef => cartListRef.productId === id); // Get the index ref
    const indexId = this.cartList[indexRef].id; // Get the product wishlist id from indexRef

    return new Promise<void>((resolve, reject) => {
      this._httpClient.delete('api/ecommerce-userCart/' + indexId).subscribe((response: any) => {
        this.getCartList();
        resolve();
      }, reject);
    });
  }
}
