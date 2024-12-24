import { Component, Input, OnInit } from '@angular/core';
import { Icarousel } from '../interface/Icarousel.interface';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() options:Icarousel ={}
 
  constructor() { }

  ngOnInit(): void {

  }

}
