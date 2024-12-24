import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

export class FilterInterface {
  brands?: [
    {
      id: number,
      name: string,
      count: number
    }
  ]
  discounts?: [
    {
      id: number,
      name: string,
      count: number
    }
  ]
  subcategories?: [
    {
      id: number,
      name: string,
      count: number
    }
  ]

}
export class SearchQueryInterface {
  brandIds?: number[] = []
  categoryId?: number
  subCategoryId?: number
  priceMin?: number
  priceMax?: number
  onSale?: true
  name?: string
  rate?: number
};

@Component({
  selector: 'ecommerce-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../ecommerce-shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EcommerceSidebarComponent implements OnInit {
  // Public
  public sliderPriceValue = [1, 100];
  private _filters: FilterInterface;
  @Input() set filters(value: FilterInterface) {
    this._filters = value
    this.renderFilters(this._filters)
  };
  get filters() {
    return this._filters;
  };
  public searcQuery: SearchQueryInterface = new SearchQueryInterface();

  @Input() Categories: { name: string, id: number, count?: number, selected?: boolean, active?: boolean }[];
  @Input() Brands: { name: string, id: number, count?: number, selected?: boolean, active?: boolean }[];
  @Output() updateFilters: EventEmitter<any> = new EventEmitter();

  renderFilters(filters: FilterInterface) {
    this.Brands.forEach(element => {
      if (filters.brands?.find(o => o.id == element.id))
        element.active = true;
        else
        element.active = false;

    });
  }
  constructor() { }
  brandChange(event: any) {
    let brandId:number = event.target.value;
    if (event.target.checked) {
      this.searcQuery.brandIds.push(brandId);
    }
    else {
      let index = this.searcQuery.brandIds.indexOf(brandId);
      if (index >= 0)
        this.searcQuery.brandIds.splice(index, 1)
    }
    console.log(this.searcQuery)
  }
  update() {
    this.updateFilters.emit({});
  }

  ngOnInit(): void { }
}

// const uri = 'https://mozilla.org/?x=шеллы';
// const encoded = encodeURI(uri);
// console.log(encoded);
// // Expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

// try {
//   console.log(decodeURI(encoded));
//   // Expected output: "https://mozilla.org/?x=шеллы"
// } catch (e) { // Catches a malformed URI
//   console.error(e);
// }
// console.log(JSON.stringify({ x: 5, y: 6 }));
// // Expected output: "{"x":5,"y":6}"

// console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// // Expected output: "[3,"false",false]"

// console.log(JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] }));
// // Expected output: "{"x":[10,null,null,null]}"

// console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// // Expected output: ""2006-01-02T15:04:05.000Z""


