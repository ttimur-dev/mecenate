import { useQuery } from '@tanstack/react-query';

import { fetchPostDetail } from '../api/fetch-post-detail';

export function usePostDetailQuery(postId: string) {
  return useQuery({
    queryKey: ['post-detail', postId],
    queryFn: ({ signal }) => fetchPostDetail(postId, signal),
    enabled: Boolean(postId),
  });
}
