import { TestBed, inject } from '@angular/core/testing';

import { StaffApiService } from './staff-api.service';

describe('StaffApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffApiService]
    });
  });

  it('should be created', inject([StaffApiService], (service: StaffApiService) => {
    expect(service).toBeTruthy();
  }));
});
