/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IndividualStatementsService } from './individualindividualstatements.service';

describe('Service: IndividualStatements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndividualStatementsService]
    });
  });

  it('should ...', inject([IndividualStatementsService], (service: IndividualStatementsService) => {
    expect(service).toBeTruthy();
  }));
});
