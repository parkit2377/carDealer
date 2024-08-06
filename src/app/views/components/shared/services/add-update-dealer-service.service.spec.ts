import { TestBed } from '@angular/core/testing';

import { AddUpdateDealerServiceService } from './add-update-dealer-service.service';

describe('AddUpdateDealerServiceService', () => {
  let service: AddUpdateDealerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUpdateDealerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
