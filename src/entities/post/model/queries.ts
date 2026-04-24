import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { fetchPostComments, fetchPostDetail, fetchPostsPage } from '../api';
import type { Tier } from './types';

const FEED_PAGE_SIZE = 10;
const COMMENTS_PAGE_SIZE = 20;

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

export function usePostDetailQuery(postId: string) {
  return useQuery({
    queryKey: ['post-detail', postId],
    queryFn: ({ signal }) => fetchPostDetail(postId, signal),
    enabled: Boolean(postId),
  });
}

export function usePostCommentsQuery(postId: string) {
  return useInfiniteQuery({
    queryKey: ['post-comments', postId],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      fetchPostComments({
        postId,
        cursor: pageParam,
        limit: COMMENTS_PAGE_SIZE,
        signal,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return lastPage.nextCursor ?? undefined;
    },
    enabled: Boolean(postId),
  });
}
