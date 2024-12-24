import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllASubscriptioncostComponent } from './all-asubscriptioncost.component';

describe('AllASubscriptioncostComponent', () => {
  let component: AllASubscriptioncostComponent;
  let fixture: ComponentFixture<AllASubscriptioncostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllASubscriptioncostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllASubscriptioncostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
