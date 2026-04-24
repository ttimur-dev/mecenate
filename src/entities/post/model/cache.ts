import type { InfiniteData } from '@tanstack/react-query';

import { queryClient } from '@/shared/config';
import type { Comment, CommentsPage, Post, PostsPage } from './types';

export type PostDetailCache = Post | undefined;
export type PostCommentsCache = InfiniteData<CommentsPage, string | undefined> | undefined;
export type FeedPostsCache =
  | {
      pages: PostsPage[];
      pageParams: unknown[];
    }
  | undefined;

export type PostLikeCacheUpdate = {
  isLiked?: boolean;
  likesCount: number;
};

type CommentAddedCacheUpdateOptions = {
  createCommentsCache?: boolean;
};

export type CommentInsertStatus = 'inserted' | 'duplicate' | 'skipped';

function updatePostLike(post: Post, nextLike: PostLikeCacheUpdate): Post {
  return {
    ...post,
    isLiked: nextLike.isLiked ?? post.isLiked,
    likesCount: nextLike.likesCount,
  };
}

function incrementCommentsCount(post: Post): Post {
  return {
    ...post,
    commentsCount: post.commentsCount + 1,
  };
}

export function applyPostLikeCacheUpdate(postId: string, nextLike: PostLikeCacheUpdate) {
  queryClient.setQueryData<PostDetailCache>(['post-detail', postId], (currentPost) =>
    currentPost ? updatePostLike(currentPost, nextLike) : currentPost
  );

  queryClient.setQueriesData<FeedPostsCache>({ queryKey: ['feed-posts'] }, (currentFeedPosts) => {
    if (!currentFeedPosts) {
      return currentFeedPosts;
    }

    return {
      ...currentFeedPosts,
      pages: currentFeedPosts.pages.map((page) => ({
        ...page,
        posts: page.posts.map((post) => (post.id === postId ? updatePostLike(post, nextLike) : post)),
      })),
    };
  });
}

export function incrementPostCommentsCountCache(postId: string) {
  queryClient.setQueryData<PostDetailCache>(['post-detail', postId], (currentPost) =>
    currentPost ? incrementCommentsCount(currentPost) : currentPost
  );

  queryClient.setQueriesData<FeedPostsCache>({ queryKey: ['feed-posts'] }, (currentFeedPosts) => {
    if (!currentFeedPosts) {
      return currentFeedPosts;
    }

    return {
      ...currentFeedPosts,
      pages: currentFeedPosts.pages.map((page) => ({
        ...page,
        posts: page.posts.map((post) => (post.id === postId ? incrementCommentsCount(post) : post)),
      })),
    };
  });
}

export function insertCommentIntoCache(
  postId: string,
  comment: Comment,
  options: CommentAddedCacheUpdateOptions = {}
) {
  const currentComments = queryClient.getQueryData<PostCommentsCache>(['post-comments', postId]);

  if (!currentComments) {
    if (!options.createCommentsCache) {
      return 'skipped';
    }

    queryClient.setQueryData<PostCommentsCache>(['post-comments', postId], {
      pages: [{ comments: [comment], nextCursor: null, hasMore: false }],
      pageParams: [undefined],
    });

    return 'inserted';
  }

  const alreadyExists = currentComments.pages.some((page) =>
    page.comments.some((existingComment) => existingComment.id === comment.id)
  );

  if (alreadyExists) {
    return 'duplicate';
  }

  const [firstPage, ...restPages] = currentComments.pages;

  queryClient.setQueryData<PostCommentsCache>(['post-comments', postId], {
    ...currentComments,
    pages: [
      {
        ...firstPage,
        comments: [comment, ...firstPage.comments],
      },
      ...restPages,
    ],
  });

  return 'inserted';
}

export function applyCommentAddedCacheUpdate(
  postId: string,
  comment: Comment,
  options: CommentAddedCacheUpdateOptions = {}
) {
  const insertStatus = insertCommentIntoCache(postId, comment, options);

  if (insertStatus === 'inserted') {
    incrementPostCommentsCountCache(postId);
  }
}
