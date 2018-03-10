import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStaffComponent } from './document-staff.component';

describe('DocumentStaffComponent', () => {
  let component: DocumentStaffComponent;
  let fixture: ComponentFixture<DocumentStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
