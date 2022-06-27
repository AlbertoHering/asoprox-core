/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StatementsService } from './statements.service';

describe('Service: Statements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatementsService]
    });
  });

  it('should ...', inject([StatementsService], (service: StatementsService) => {
    expect(service).toBeTruthy();
  }));
});
