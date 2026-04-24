import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/shared/config';
import {
  createPostComment,
  togglePostLike,
  type TogglePostLikeResult,
} from '../api';
import {
  applyCommentAddedCacheUpdate,
  applyPostLikeCacheUpdate,
  type FeedPostsCache,
  type PostDetailCache,
} from './cache';
import type { Comment, Post } from './types';

type ToggleLikeMutationContext = {
  previousPost?: PostDetailCache;
  previousFeedPosts?: [readonly unknown[], FeedPostsCache][];
};

function findPostInFeedCaches(feedCaches: [readonly unknown[], FeedPostsCache][], postId: string) {
  for (const [, feedCache] of feedCaches) {
    const matchingPost = feedCache?.pages
      .flatMap((page) => page.posts)
      .find((post) => post.id === postId);

    if (matchingPost) {
      return matchingPost;
    }
  }

  return undefined;
}

function buildOptimisticLike(post: Post): TogglePostLikeResult {
  return {
    isLiked: !post.isLiked,
    likesCount: Math.max(0, post.likesCount + (post.isLiked ? -1 : 1)),
  };
}

export function useTogglePostLikeMutation(postId: string) {
  return useMutation<TogglePostLikeResult, Error, void, ToggleLikeMutationContext>({
    mutationFn: () => togglePostLike(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post-detail', postId] });
      await queryClient.cancelQueries({ queryKey: ['feed-posts'] });

      const previousPost = queryClient.getQueryData<PostDetailCache>(['post-detail', postId]);
      const previousFeedPosts = queryClient.getQueriesData<FeedPostsCache>({
        queryKey: ['feed-posts'],
      });
      const optimisticSourcePost = previousPost ?? findPostInFeedCaches(previousFeedPosts, postId);

      if (optimisticSourcePost) {
        applyPostLikeCacheUpdate(postId, buildOptimisticLike(optimisticSourcePost));
      }

      return {
        previousPost,
        previousFeedPosts,
      };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post-detail', postId], context.previousPost);
      }

      if (context?.previousFeedPosts) {
        for (const [queryKey, previousFeedPosts] of context.previousFeedPosts) {
          queryClient.setQueryData(queryKey, previousFeedPosts);
        }
      }
    },
    onSuccess: (nextLike) => {
      applyPostLikeCacheUpdate(postId, nextLike);
    },
  });
}

export function useCreatePostCommentMutation(postId: string) {
  return useMutation({
    mutationFn: (text: string) => createPostComment(postId, text),
    onSuccess: (comment: Comment) => {
      applyCommentAddedCacheUpdate(postId, comment, { createCommentsCache: true });
    },
  });
}
