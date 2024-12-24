import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinesTypesComponent } from './bussines-types.component';

describe('BussinesTypesComponent', () => {
  let component: BussinesTypesComponent;
  let fixture: ComponentFixture<BussinesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BussinesTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BussinesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
