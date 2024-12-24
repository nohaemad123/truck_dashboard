import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfrequentQuestionsComponent } from './allfrequent-questions.component';

describe('AllfrequentQuestionsComponent', () => {
  let component: AllfrequentQuestionsComponent;
  let fixture: ComponentFixture<AllfrequentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfrequentQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllfrequentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
