import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateStudentAppCodeComponent } from './generate-student-app-code.component';

describe('GenerateStudentAppCodeComponent', () => {
    let component: GenerateStudentAppCodeComponent;
    let fixture: ComponentFixture<GenerateStudentAppCodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GenerateStudentAppCodeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GenerateStudentAppCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
