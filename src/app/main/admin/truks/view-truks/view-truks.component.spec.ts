import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTruksComponent } from './view-truks.component';

describe('ViewTruksComponent', () => {
  let component: ViewTruksComponent;
  let fixture: ComponentFixture<ViewTruksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTruksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTruksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
