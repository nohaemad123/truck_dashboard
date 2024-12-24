import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBannarsComponent } from './all-bannars.component';

describe('AllBannarsComponent', () => {
  let component: AllBannarsComponent;
  let fixture: ComponentFixture<AllBannarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBannarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBannarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
