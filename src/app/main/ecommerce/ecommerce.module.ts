import { CategoryProductsComponent } from './ecommerce-home/category-products/category-products.component';
import { DealsComponent } from './ecommerce-home/deals/deals.component';
import { ProductsComponent } from './../admin/products/products/products.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { EcommerceService } from 'app/main/ecommerce/ecommerce.service';
import { EcommerceDetailsComponent } from 'app/main/ecommerce/ecommerce-details/ecommerce-details.component';
import { EcommerceItemComponent } from 'app/main/ecommerce/ecommerce-item/ecommerce-item.component';
import { EcommerceShopComponent } from 'app/main/ecommerce/ecommerce-shop/ecommerce-shop.component';
import { EcommerceSidebarComponent } from 'app/main/ecommerce/ecommerce-shop/sidebar/sidebar.component';
import { EcommerceWishlistComponent } from 'app/main/ecommerce/ecommerce-wishlist/ecommerce-wishlist.component';
import { EcommerceCheckoutComponent } from 'app/main/ecommerce/ecommerce-checkout/ecommerce-checkout.component';
import { EcommerceCheckoutItemComponent } from 'app/main/ecommerce/ecommerce-checkout/ecommerce-checkout-item/ecommerce-checkout-item.component';
import { EcommerceHomeComponent } from './ecommerce-home/ecommerce-home.component';
import { CarouselComponent } from './ecommerce-home/carousel/carousel.component';
import { ShopByProductsComponent } from './ecommerce-home/shop-by-products/shop-by-products.component';
import { ShopByBrandsComponent } from './ecommerce-home/shop-by-brands/shop-by-brands.component';
import { ShopByCategoriesComponent } from './ecommerce-home/shop-by-categories/shop-by-categories.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  observer: true
};

// routing
const routes: Routes = [
  {
    path: '',
    component: EcommerceHomeComponent,
    resolve: {
      // ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceHomeComponent' }
  },
  {
    path: 'shop',
    component: EcommerceShopComponent,
    resolve: {
      ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceShopComponent' }
  },
  {
    path: 'details/:id',
    component: EcommerceDetailsComponent,
    resolve: {
      // ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceDetailsComponent' }
  },
  {
    path: 'wishlist',
    component: EcommerceWishlistComponent,
    resolve: {
      // ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceWishlistComponent' }
  },
  {
    path: 'checkout',
    component: EcommerceCheckoutComponent,
    resolve: {
      // ecommerce: EcommerceService
    },
    data: { animation: 'EcommerceCheckoutComponent' }
  },  
  {
    path: 'details',
    redirectTo: 'details/27', //Redirection
    data: { animation: 'EcommerceDetailsComponent' }
  }
  // ,
  // {
  //   path: '',
  //   redirectTo: '/shop',
  //   pathMatch: 'full'
  // },
];


@NgModule({
  declarations: [
    EcommerceShopComponent,
    EcommerceSidebarComponent,
    EcommerceDetailsComponent,
    EcommerceWishlistComponent,
    EcommerceCheckoutComponent,
    EcommerceItemComponent,
    EcommerceCheckoutItemComponent,
    EcommerceHomeComponent,
    CarouselComponent,
    ShopByProductsComponent,
    ShopByBrandsComponent,
    ShopByCategoriesComponent,
    DealsComponent,
    CategoryProductsComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SwiperModule,
    FormsModule,
    CoreTouchspinModule,
    ContentHeaderModule,
    CoreSidebarModule,
    CoreCommonModule,
    NgbModule,
    NouisliderModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class EcommerceModule {}
