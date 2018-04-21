import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassParentsComponent } from './class-parents.component';

describe('ClassParentsComponent', () => {
  let component: ClassParentsComponent;
  let fixture: ComponentFixture<ClassParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
