import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { SearchEcommerceService } from 'app/layout/components/navbar/navbar-search-ecommerce/navbar-search-ecommerce.service';

import { EcommerceService } from 'app/main/ecommerce/ecommerce.service';
import { FilterInterface } from './sidebar/sidebar.component';
@Component({
  selector: 'app-ecommerce-shop',
  templateUrl: './ecommerce-shop.component.html',
  styleUrls: ['./ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'ecommerce-application' }
})
export class EcommerceShopComponent implements OnInit {
  // public
  public contentHeader: object;
  public shopSidebarToggle = false;
  public shopSidebarReset = false;
  public gridViewRef = true;
  public products;
  public wishlist;
  public cartList;
  public categoryList;
  public brandList;  
  public filtersList;
  public page = 1;
  public pageSize = 20;
 public  searchText = '';

  /**
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {EcommerceService} _ecommerceService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private route: ActivatedRoute, private _ecommerceService: EcommerceService,private _coreConfigService:CoreConfigService,private _searchEcommerceService:SearchEcommerceService) {

  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Update to List View
   */
  listView() {
    this.gridViewRef = false;
  }

  /**
   * Update to Grid View
   */
  gridView() {
    this.gridViewRef = true;
  }

  /**
   * Sort Product
   */
  sortProduct(sortParam) {
    this._ecommerceService.sortProduct(sortParam);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to ProductList change
    this.route.queryParams.subscribe(val => {
      console.log(val)
      this._ecommerceService.getProducts({...val});
      // this.searchText=val.name
      this._searchEcommerceService.searchText.next(val.name)
    });
    this._searchEcommerceService.searchText.subscribe(o=>{
      this.searchText=o
    })
    this._ecommerceService.onProductListChange.subscribe(res => {
      this.products = res.products.items;
      this.filtersList = res.filters as FilterInterface;
      this.products.isInWishlist = false;
    });

    // Subscribe to Wishlist change
    this._ecommerceService.onWishlistChange.subscribe(res => (this.wishlist = res));
    this._ecommerceService.onBrandListChange.subscribe(res => (this.brandList = res));
    this._ecommerceService.onCategoryListChange.subscribe(res => (this.categoryList = res));

    // Subscribe to Cartlist change
    this._ecommerceService.onCartListChange.subscribe(res => (this.cartList = res));

    // update product is in Wishlist & is in CartList : Boolean
    this.products.forEach(product => {
      product.isInWishlist = this.wishlist.findIndex(p => p.productId === product.id) > -1;
      product.isInCart = this.cartList.findIndex(p => p.productId === product.id) > -1;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Shop',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'eCommerce',
            isLink: true,
            link: '/'
          },
          {
            name: 'Shop',
            isLink: false
          }
        ]
      }
    };
  }
}
