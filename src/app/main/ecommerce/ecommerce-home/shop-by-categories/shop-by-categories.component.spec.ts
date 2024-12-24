import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopByCategoriesComponent } from './shop-by-categories.component';

describe('ShopByCategoriesComponent', () => {
  let component: ShopByCategoriesComponent;
  let fixture: ComponentFixture<ShopByCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopByCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopByCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
