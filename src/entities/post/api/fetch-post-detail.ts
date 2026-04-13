import { apiGet } from '@/shared/api';

import type { Post } from '../model/types';

type PostDetailResponse = {
  ok: true;
  data: {
    post: Post;
  };
};

export async function fetchPostDetail(postId: string, signal?: AbortSignal): Promise<Post> {
  const response = await apiGet<PostDetailResponse>(`posts/${postId}`, { signal });
  return response.data.post;
}
