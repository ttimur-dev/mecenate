export type Tier = 'free' | 'paid';

export type Author = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
};

export type Post = {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: Tier;
  createdAt: string;
};

export type PostsPage = {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  author: Author;
  text: string;
  createdAt: string;
};
