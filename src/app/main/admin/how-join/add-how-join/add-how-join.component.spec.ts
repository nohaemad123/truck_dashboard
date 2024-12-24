import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHowJoinComponent } from './add-how-join.component';

describe('AddHowJoinComponent', () => {
  let component: AddHowJoinComponent;
  let fixture: ComponentFixture<AddHowJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHowJoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHowJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
