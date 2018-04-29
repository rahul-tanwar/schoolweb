import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateExperienceComponent } from './add-certificate-experience.component';

describe('AddCertificateExperienceComponent', () => {
  let component: AddCertificateExperienceComponent;
  let fixture: ComponentFixture<AddCertificateExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCertificateExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCertificateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
