import { TestBed } from '@angular/core/testing';

import { GetUsers } from './api.getUser.service';

describe('ApiService', () => {
  let service: GetUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
