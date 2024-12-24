import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Products } from 'app/main/admin/products/products.model';

import { EcommerceService } from 'app/main/ecommerce/ecommerce.service';

@Component({
  selector: 'app-ecommerce-item',
  templateUrl: './ecommerce-item.component.html',
  styleUrls: ['./ecommerce-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceItemComponent implements OnInit {
  // Input Decorotor
  private _product:Products;
  @Input() set product(value:Products){
    this._product=value
  };
  get product(){
    return this._product
  };
  @Input() isWishlistOpen = false;
  @Input() isGridView = false;

  // Public
  public isInCart = false;

  /**
   *
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _ecommerceService: EcommerceService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Wishlist
   *
   * @param product
   */
  toggleWishlist(product) {
    if (product.isInWishlist === true) {
      this._ecommerceService.removeFromWishlist(product.id).then(res => {
        product.isInWishlist = false;
      });
    } else {
      this._ecommerceService.addToWishlist(product.id).then(res => {
        product.isInWishlist = true;
      });
    }
  }
  changeSource(event:any) {
    let fallback_path = 'assets/images/image.svg';
    event.target.src = fallback_path;

  }
  /**
   * Add To Cart
   *
   * @param product
   */
  addToCart(product) {
    this._ecommerceService.addToCart(product.id).then(res => {
      product.isInCart = true;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {}
}
