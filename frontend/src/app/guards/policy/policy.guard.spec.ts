import { TestBed } from '@angular/core/testing';
import { PolicyGuard } from './policy.guard';

describe('PolicyGuard', () => {
  let guard: PolicyGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    guard = TestBed.get(PolicyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
