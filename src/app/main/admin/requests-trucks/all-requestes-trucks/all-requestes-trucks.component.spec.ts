import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestesTrucksComponent } from './all-requestes-trucks.component';

describe('AllRequestesTrucksComponent', () => {
  let component: AllRequestesTrucksComponent;
  let fixture: ComponentFixture<AllRequestesTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRequestesTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRequestesTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
