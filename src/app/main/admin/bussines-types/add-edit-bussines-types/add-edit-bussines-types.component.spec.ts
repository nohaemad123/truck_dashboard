import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBussinesTypesComponent } from './add-edit-bussines-types.component';

describe('AddEditBussinesTypesComponent', () => {
  let component: AddEditBussinesTypesComponent;
  let fixture: ComponentFixture<AddEditBussinesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBussinesTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBussinesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
