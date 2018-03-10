import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingStaffComponent } from './setting-staff.component';

describe('SettingStaffComponent', () => {
  let component: SettingStaffComponent;
  let fixture: ComponentFixture<SettingStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
