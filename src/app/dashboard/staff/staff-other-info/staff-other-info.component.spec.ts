import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOtherInfoComponent } from './staff-other-info.component';

describe('StaffOtherInfoComponent', () => {
  let component: StaffOtherInfoComponent;
  let fixture: ComponentFixture<StaffOtherInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffOtherInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
