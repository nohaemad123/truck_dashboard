import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNotficationComponent } from './send-notfication.component';

describe('SendNotficationComponent', () => {
  let component: SendNotficationComponent;
  let fixture: ComponentFixture<SendNotficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendNotficationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNotficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
