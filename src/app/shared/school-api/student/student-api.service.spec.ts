import { TestBed, inject } from '@angular/core/testing';

import { StudentApiService } from './student-api.service';

describe('StudentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentApiService]
    });
  });

  it('should be created', inject([StudentApiService], (service: StudentApiService) => {
    expect(service).toBeTruthy();
  }));
});
