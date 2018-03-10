import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOtherInfoComponent } from './school-other-info.component';

describe('SchoolOtherInfoComponent', () => {
  let component: SchoolOtherInfoComponent;
  let fixture: ComponentFixture<SchoolOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
