import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCertificateInfoComponent } from './experience-certificate-info.component';

describe('ExperienceCertificateInfoComponent', () => {
  let component: ExperienceCertificateInfoComponent;
  let fixture: ComponentFixture<ExperienceCertificateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceCertificateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCertificateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
