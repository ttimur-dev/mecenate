import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchPostsPage } from '../api/fetch-posts-page';
import type { Tier } from './types';

const FEED_PAGE_SIZE = 10;

export function useFeedPostsQuery(simulateError: boolean, filter: Tier | 'all') {
  return useInfiniteQuery({
    queryKey: ['feed-posts', simulateError, filter],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      fetchPostsPage({
        cursor: pageParam,
        limit: FEED_PAGE_SIZE,
        simulateError,
        filter,
        signal,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.nextCursor ?? undefined;
    },
  });
}
