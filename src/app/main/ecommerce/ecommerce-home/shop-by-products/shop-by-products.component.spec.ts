import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByProductsComponent } from './shop-by-products.component';

describe('ShopByProductsComponent', () => {
  let component: ShopByProductsComponent;
  let fixture: ComponentFixture<ShopByProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopByProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
