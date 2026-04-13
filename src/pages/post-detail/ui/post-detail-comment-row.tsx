import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { type Comment, LikeOutlineIcon, LikeSolidIcon } from '@/entities/post';
import { tokens } from '@/shared/theme/tokens';
import { styles } from './post-detail-screen.styles';

export type CommentLikeMeta = {
  count: number;
  active: boolean;
};

type PostDetailCommentRowProps = {
  comment: Comment;
  likeMeta: CommentLikeMeta;
};

export function PostDetailCommentRow({ comment, likeMeta }: PostDetailCommentRowProps) {
  return (
    <View style={styles.commentRow}>
      <View style={styles.commentLeft}>
        <Image source={{ uri: comment.author.avatarUrl }} style={styles.commentAvatar} contentFit="cover" />
        <View style={styles.commentLabels}>
          <Text style={styles.commentAuthor}>{comment.author.displayName}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      </View>
      <View style={styles.commentLike}>
        {likeMeta.active ? (
          <LikeSolidIcon color={tokens.colors.likeActive} />
        ) : (
          <LikeOutlineIcon color={tokens.colors.textMuted} />
        )}
        <Text style={styles.commentLikeCount}>{likeMeta.count}</Text>
      </View>
    </View>
  );
}
