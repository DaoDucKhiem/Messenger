import { TestBed } from '@angular/core/testing';

import { DataTranferService } from './data-tranfer.service';

describe('DataTranferService', () => {
  let service: DataTranferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTranferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
