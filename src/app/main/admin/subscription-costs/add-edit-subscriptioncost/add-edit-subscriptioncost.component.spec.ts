import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubscriptioncostComponent } from './add-edit-subscriptioncost.component';

describe('AddEditSubscriptioncostComponent', () => {
  let component: AddEditSubscriptioncostComponent;
  let fixture: ComponentFixture<AddEditSubscriptioncostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSubscriptioncostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSubscriptioncostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
