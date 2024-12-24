import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWishlistComponent } from './navbar-wishlist.component';

describe('NavbarWishlistComponent', () => {
  let component: NavbarWishlistComponent;
  let fixture: ComponentFixture<NavbarWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
