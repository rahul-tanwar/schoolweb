import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentActivityComponent } from './student-activity.component';

describe('StudentActivityComponent', () => {
  let component: StudentActivityComponent;
  let fixture: ComponentFixture<StudentActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
