import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'app/main/admin/products/products.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-shop-by-categories',
  templateUrl: './shop-by-categories.component.html',
  styleUrls: ['./shop-by-categories.component.scss']
})
export class ShopByCategoriesComponent implements OnInit {
  @Input() categories;
 // Swiper
 
  constructor() { }

  ngOnInit(): void {
  }

}
