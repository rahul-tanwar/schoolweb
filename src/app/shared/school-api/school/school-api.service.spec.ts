import { TestBed, inject } from '@angular/core/testing';

import { SchoolServiceApi } from './school-api.service';

describe('SchoolService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SchoolServiceApi]
        });
    });

    it('should be created', inject([SchoolServiceApi], (service: SchoolServiceApi) => {
        expect(service).toBeTruthy();
    }));
});
