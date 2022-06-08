import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionstatusComponent } from './questionstatus.component';

describe('QuestionstatusComponent', () => {
  let component: QuestionstatusComponent;
  let fixture: ComponentFixture<QuestionstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
