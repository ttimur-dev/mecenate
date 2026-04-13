import { makeAutoObservable } from 'mobx';

import type { FeedFilter } from './types';

class FeedFilterStore {
  simulateError = false;
  activeFilter: FeedFilter = 'all';

  constructor() {
    makeAutoObservable(this);
  }

  setSimulateError(value: boolean) {
    this.simulateError = value;
  }

  setActiveFilter(filter: FeedFilter) {
    this.activeFilter = filter;
  }
}

export const feedFilterStore = new FeedFilterStore();
