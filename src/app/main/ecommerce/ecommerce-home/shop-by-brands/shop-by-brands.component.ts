import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-by-brands',
  templateUrl: './shop-by-brands.component.html',
  styleUrls: ['./shop-by-brands.component.scss']
})
export class ShopByBrandsComponent implements OnInit {
  @Input() brands;
 // Swiper
 
  constructor() { }

  ngOnInit(): void {
  }

}
