import { useQuery } from '@tanstack/react-query';

import { fetchPostComments } from '../api/fetch-post-comments';

export function usePostCommentsQuery(postId: string) {
  return useQuery({
    queryKey: ['post-comments', postId],
    queryFn: ({ signal }) => fetchPostComments(postId, signal),
    enabled: Boolean(postId),
  });
}
