import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSetApartComponent } from './add-edit-set-apart.component';

describe('AddEditSetApartComponent', () => {
  let component: AddEditSetApartComponent;
  let fixture: ComponentFixture<AddEditSetApartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSetApartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSetApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
