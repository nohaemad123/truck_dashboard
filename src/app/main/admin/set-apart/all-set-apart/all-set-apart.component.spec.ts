import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSetApartComponent } from './all-set-apart.component';

describe('AllSetApartComponent', () => {
  let component: AllSetApartComponent;
  let fixture: ComponentFixture<AllSetApartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSetApartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSetApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
