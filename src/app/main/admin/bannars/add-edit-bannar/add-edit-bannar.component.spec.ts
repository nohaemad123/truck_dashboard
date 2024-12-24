import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBannarComponent } from './add-edit-bannar.component';

describe('AddEditBannarComponent', () => {
  let component: AddEditBannarComponent;
  let fixture: ComponentFixture<AddEditBannarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBannarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBannarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
