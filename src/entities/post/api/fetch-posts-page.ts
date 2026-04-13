import { apiGet } from '@/shared/api';

import type { PostsPage, Tier } from '../model/types';

type FetchPostsPageParams = {
  cursor?: string;
  limit: number;
  simulateError: boolean;
  filter: Tier | 'all';
  signal?: AbortSignal;
};

type PostsResponse = {
  ok: true;
  data: PostsPage;
};

export async function fetchPostsPage({
  cursor,
  limit,
  simulateError,
  filter,
  signal,
}: FetchPostsPageParams): Promise<PostsPage> {
  const response = await apiGet<PostsResponse>('posts', {
    signal,
    query: {
      limit,
      cursor,
      tier: filter === 'all' ? undefined : filter,
      simulate_error: simulateError || undefined,
    },
  });

  return response.data;
}
