import { Component, OnInit } from '@angular/core';
import { Products } from 'app/main/admin/products/products.model';
import { EcommerceService } from 'app/main/ecommerce/ecommerce.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-wishlist',
  templateUrl: './navbar-wishlist.component.html',
  styleUrls: ['./navbar-wishlist.component.scss']
})
export class NavbarWishlistComponent implements OnInit {
 // Public
 public products:Products[] = [];
 public wishList = [];
 public wishListLength;

 // Private
 private _unsubscribeAll: Subject<any>;

 /**
  *
  * @param {EcommerceService} _ecommerceService
  */
 constructor(public _ecommerceService: EcommerceService) {
   this._unsubscribeAll = new Subject();
 }

 // Public Methods
 // -----------------------------------------------------------------------------------------------------

 /**
  * Remove From Cart
  *
  * @param product
  */
 removeFromWishlist(product) {
   if (product.isInWishlist === true) {
     this._ecommerceService.removeFromWishlist(product.id).then(res => {
       product.isInWishlist = false;
     });
   }
 }

 // Lifecycle Hooks
 // -----------------------------------------------------------------------------------------------------

 /**
  * On init
  */
 ngOnInit(): void {
   // Get Products
   this._ecommerceService.getProducts();

   // Get Cart List
   this._ecommerceService.getWishlist();

   // Subscribe to Cart List
   this._ecommerceService.onWishlistChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
     this.wishList = res;
     this.wishListLength = this.wishList.length;
   });

   // Subscribe to ProductList change
   this._ecommerceService.onProductListChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
    this.products = res.products?.items??[];

     if (this.products.length) {
       // update product is in wishList : Boolean
       this.products.forEach(product => {
         product.isInWishlist = this.wishList.findIndex(p => p.productId === product.id) > -1;
       });
     }
   });
 }
}
