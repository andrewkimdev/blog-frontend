import { TestBed } from '@angular/core/testing';

import { MockDataService } from 'src/app/mock-services/mock-data.service';

describe('PostService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
