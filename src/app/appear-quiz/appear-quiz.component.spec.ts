import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppearQuizComponent } from './appear-quiz.component';

describe('AppearQuizComponent', () => {
  let component: AppearQuizComponent;
  let fixture: ComponentFixture<AppearQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppearQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppearQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
