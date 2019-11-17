import { TestBed, async, inject } from '@angular/core/testing';

import { HighLevelGuard } from './high-level.guard';

describe('HighLevelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighLevelGuard]
    });
  });

  it('should ...', inject([HighLevelGuard], (guard: HighLevelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
