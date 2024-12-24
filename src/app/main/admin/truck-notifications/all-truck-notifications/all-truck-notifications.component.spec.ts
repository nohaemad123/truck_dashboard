import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTruckNotificationsComponent } from './all-truck-notifications.component';

describe('AllTruckNotificationsComponent', () => {
  let component: AllTruckNotificationsComponent;
  let fixture: ComponentFixture<AllTruckNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTruckNotificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTruckNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
