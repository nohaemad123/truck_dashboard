import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EcommerceService } from '../ecommerce.service';

@Component({
  selector: 'app-ecommerce-home',
  templateUrl: './ecommerce-home.component.html',
  styleUrls: ['./ecommerce-home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceHomeComponent implements OnInit {
  public products;
  public categories;
  public brands;

  constructor( private _ecommerceService: EcommerceService) { }

  ngOnInit(): void {
    this._ecommerceService.onProductListChange.subscribe(res => {
      this.products = res.products.items;
      this.products.isInWishlist = false; 
    });
    this._ecommerceService.onBrandListChange.subscribe(res => (this.brands = res));

    this._ecommerceService.onCategoryListChange.subscribe(res => {
      this.categories = res;
    });
  }

}
