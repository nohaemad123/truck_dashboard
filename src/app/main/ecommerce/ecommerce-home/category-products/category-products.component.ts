import { Component, Input, OnInit } from '@angular/core';
import { Products } from 'app/main/admin/products/products.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  @Input() products:Products;
  @Input() categoryName:string;
  // Swiper
  public swiperResponsive: SwiperConfigInterface = {
   slidesPerView: 5,
   spaceBetween: 50,
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev'
   },
   breakpoints: {
     1440: {
       slidesPerView: 5,
       spaceBetween: 10
     },
     1280: {
       slidesPerView: 4,
       spaceBetween: 10
     },
     1024: {
       slidesPerView: 3,
       spaceBetween: 40
     },
     768: {
       slidesPerView: 3,
       spaceBetween: 30
     },
     640: {
       slidesPerView: 2,
       spaceBetween: 20
     },
     320: {
       slidesPerView: 1,
       spaceBetween: 10
     }
   }
 };
   constructor() { }
 
   ngOnInit(): void {
   }
 
 }
 