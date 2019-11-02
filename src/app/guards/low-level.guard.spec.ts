import { TestBed, async, inject } from '@angular/core/testing';

import { LowLevelGuard } from './low-level.guard';

describe('LowLevelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LowLevelGuard]
    });
  });

  it('should ...', inject([LowLevelGuard], (guard: LowLevelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
