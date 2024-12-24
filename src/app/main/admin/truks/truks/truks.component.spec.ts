import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruksComponent } from './truks.component';

describe('TruksComponent', () => {
  let component: TruksComponent;
  let fixture: ComponentFixture<TruksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
