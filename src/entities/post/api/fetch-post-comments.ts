import { apiGet } from '@/shared/api';

import type { Comment } from '../model/types';

type CommentsResponse = {
  ok: true;
  data: {
    comments: Comment[];
    nextCursor: string | null;
    hasMore: boolean;
  };
};

export async function fetchPostComments(postId: string, signal?: AbortSignal): Promise<Comment[]> {
  const response = await apiGet<CommentsResponse>(`posts/${postId}/comments`, {
    signal,
    query: {
      limit: 20,
    },
  });

  return response.data.comments;
}
