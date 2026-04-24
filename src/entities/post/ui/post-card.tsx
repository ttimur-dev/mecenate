import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

import type { Post } from '../model/types';
import { tokens } from '@/shared/theme/tokens';
import { DonateSolidIcon } from './post-icons';
import { MetricChip, PostLikeChip } from './post-actions';
import { styles } from './post-card.styles';

type PostCardProps = {
  post: Post;
  onPress?: () => void;
  onPressLike?: () => void;
  likeDisabled?: boolean;
};

const PAID_TEXT = 'Контент скрыт пользователем.\nДоступ откроется после доната';

export function PostCard({ post, onPress, onPressLike, likeDisabled = false }: PostCardProps) {
  const { width: screenWidth } = useWindowDimensions();

  const isPaid = post.tier === 'paid';
  const previewText = post.preview;
  const canShowMore = post.tier === 'free' && post.body.length > post.preview.length;
  const showExpandedBody = !canShowMore && post.tier === 'free' && post.body.length > 260;
  const descriptionText = showExpandedBody ? post.body : previewText;
  const descriptionLines = showExpandedBody ? undefined : 2;

  return (
    <View style={styles.card}>
      <Pressable
        disabled={isPaid || !onPress}
        accessibilityRole="button"
        accessibilityState={{ disabled: isPaid || !onPress }}
        accessibilityLabel={`Открыть публикацию: ${post.title}`}
        style={({ pressed }) => [styles.cardContentPressable, pressed && styles.cardContentPressablePressed]}
        onPress={onPress}>
        <View style={styles.authorRow}>
          <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} contentFit="cover" />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.author.displayName}</Text>
          </View>
        </View>

        <View style={styles.mediaSection}>
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: post.coverUrl }}
              style={[styles.cover, { height: screenWidth }]}
              contentFit="cover"
              blurRadius={isPaid ? 28 : 0}
            />
            {isPaid && (
              <View style={styles.paidOverlay}>
                <View style={styles.paidTopContent}>
                  <View style={styles.paidIconBox}>
                    <DonateSolidIcon color={tokens.colors.overlayText} />
                  </View>
                  <Text style={styles.paidMessage}>{PAID_TEXT}</Text>
                </View>
                <Pressable accessibilityRole="button" style={styles.donateButton}>
                  <Text style={styles.donateButtonText}>Отправить донат</Text>
                </Pressable>
              </View>
            )}
          </View>

          {isPaid ? (
            <View style={styles.paidSkeletons}>
              <View style={styles.skeletonTitle} />
              <View style={styles.skeletonText} />
            </View>
          ) : (
            <View style={styles.textSection}>
              <Text style={styles.title}>{post.title}</Text>
              <View style={[styles.previewWrapper, showExpandedBody && styles.previewExpanded]}>
                <Text numberOfLines={descriptionLines} style={styles.preview}>
                  {descriptionText}
                </Text>
                {canShowMore && (
                  <View style={styles.showMoreContainer}>
                    <LinearGradient
                      colors={[
                        tokens.colors.fadeTransparent,
                        tokens.colors.fadeSemi,
                        tokens.colors.surface,
                      ]}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={styles.showMoreFade}
                    />
                    <Text style={styles.showMoreText}>Показать еще</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </Pressable>

      {!isPaid && (
        <View style={styles.metricsRow}>
          <PostLikeChip
            value={post.likesCount}
            active={post.isLiked}
            onPress={onPressLike}
            disabled={likeDisabled}
          />
          <MetricChip type="comment" value={post.commentsCount} />
        </View>
      )}
    </View>
  );
}
