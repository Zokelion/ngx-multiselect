import { TestBed } from '@angular/core/testing';

import { SelectAllItemsService } from './select-all-items.service';

describe('SelectAllItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectAllItemsService = TestBed.get(SelectAllItemsService);
    expect(service).toBeTruthy();
  });
});
