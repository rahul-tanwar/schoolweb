import { TestBed, inject } from '@angular/core/testing';

import { ClassServiceApi } from './class.service';

describe('ClassServiceApi', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ClassServiceApi]
        });
    });

    it('should be created', inject([ClassServiceApi], (service: ClassServiceApi) => {
        expect(service).toBeTruthy();
    }));
});
