import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTruksComponent } from './add-edit-truks.component';

describe('AddEditTruksComponent', () => {
  let component: AddEditTruksComponent;
  let fixture: ComponentFixture<AddEditTruksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTruksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTruksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
