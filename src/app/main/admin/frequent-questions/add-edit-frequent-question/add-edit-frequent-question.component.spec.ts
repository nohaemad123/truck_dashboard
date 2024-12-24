import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFrequentQuestionComponent } from './add-edit-frequent-question.component';

describe('AddEditFrequentQuestionComponent', () => {
  let component: AddEditFrequentQuestionComponent;
  let fixture: ComponentFixture<AddEditFrequentQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFrequentQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFrequentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
