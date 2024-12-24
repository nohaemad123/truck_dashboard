import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHowJoinComponent } from './all-how-join.component';

describe('AllHowJoinComponent', () => {
  let component: AllHowJoinComponent;
  let fixture: ComponentFixture<AllHowJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllHowJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllHowJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
