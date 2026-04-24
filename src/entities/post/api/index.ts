import { apiGet, apiPost } from '@/shared/api';

import type { Comment, CommentsPage, Post, PostsPage, Tier } from '../model/types';

type FetchPostsPageParams = {
  cursor?: string;
  limit: number;
  simulateError: boolean;
  filter: Tier | 'all';
  signal?: AbortSignal;
};

type FetchPostCommentsParams = {
  postId: string;
  cursor?: string;
  limit: number;
  signal?: AbortSignal;
};

type PostsResponse = {
  ok: true;
  data: PostsPage;
};

type PostDetailResponse = {
  ok: true;
  data: {
    post: Post;
  };
};

type CommentsResponse = {
  ok: true;
  data: CommentsPage;
};

type CreatePostCommentResponse = {
  ok: true;
  data: {
    comment: Comment;
  };
};

type TogglePostLikeResponse = {
  ok: true;
  data: {
    isLiked: boolean;
    likesCount: number;
  };
};

export type TogglePostLikeResult = TogglePostLikeResponse['data'];

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

export async function fetchPostDetail(postId: string, signal?: AbortSignal): Promise<Post> {
  const response = await apiGet<PostDetailResponse>(`posts/${postId}`, { signal });
  return response.data.post;
}

export async function fetchPostComments({
  postId,
  cursor,
  limit,
  signal,
}: FetchPostCommentsParams): Promise<CommentsPage> {
  const response = await apiGet<CommentsResponse>(`posts/${postId}/comments`, {
    signal,
    query: {
      limit,
      cursor,
    },
  });

  return response.data;
}

export async function createPostComment(postId: string, text: string): Promise<Comment> {
  const response = await apiPost<CreatePostCommentResponse>(`posts/${postId}/comments`, {
    body: { text },
  });

  return response.data.comment;
}

export async function togglePostLike(postId: string): Promise<TogglePostLikeResult> {
  const response = await apiPost<TogglePostLikeResponse>(`posts/${postId}/like`);
  return response.data;
}
