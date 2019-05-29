/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommunicatorService } from './communicator.service';

describe('Service: Communicator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicatorService]
    });
  });

  it('should ...', inject([CommunicatorService], (service: CommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
