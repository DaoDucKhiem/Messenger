import { TestBed } from '@angular/core/testing';

import { MessagedetailService } from './messagedetail.service';

describe('MessagedetailService', () => {
  let service: MessagedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
