import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  type Comment,
  MetricChip,
  PaperPlaneIcon,
  PostLikeChip,
  useCreatePostCommentMutation,
  usePostCommentsQuery,
  usePostDetailQuery,
  useTogglePostLikeMutation,
} from "@/entities/post";
import { tokens } from "@/shared/theme/tokens";
import { styles } from "./post-detail-screen.styles";

const COMPOSER_BASE_HEIGHT = 69;

function getCommentsLabel(count: number) {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} комментариев`;
  }

  if (mod10 === 1) {
    return `${count} комментарий`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} комментария`;
  }

  return `${count} комментариев`;
}

function PostDetailCommentRow({ comment }: { comment: Comment }) {
  return (
    <View style={styles.commentRow}>
      <View style={styles.commentLeft}>
        <Image source={{ uri: comment.author.avatarUrl }} style={styles.commentAvatar} contentFit="cover" />
        <View style={styles.commentLabels}>
          <Text style={styles.commentAuthor}>{comment.author.displayName}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      </View>
    </View>
  );
}

export default function PostDetailPage() {
  const params = useLocalSearchParams<{ id?: string }>();
  const postId = typeof params.id === "string" ? params.id : "";
  const { width: screenWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const postQuery = usePostDetailQuery(postId);
  const commentsQuery = usePostCommentsQuery(postId);
  const toggleLikeMutation = useTogglePostLikeMutation(postId);
  const createCommentMutation = useCreatePostCommentMutation(postId);
  const [commentText, setCommentText] = useState("");

  const comments = useMemo(
    () => commentsQuery.data?.pages.flatMap((page) => page.comments) ?? [],
    [commentsQuery.data],
  );
  const post = postQuery.data;
  const trimmedCommentText = commentText.trim();
  const canSubmitComment =
    trimmedCommentText.length > 0 && !createCommentMutation.isPending;
  const commentsLabel = useMemo(
    () => getCommentsLabel(post?.commentsCount ?? 0),
    [post?.commentsCount],
  );

  const handleLikePress = useCallback(() => {
    if (!postId || toggleLikeMutation.isPending) {
      return;
    }

    toggleLikeMutation.mutate();
  }, [postId, toggleLikeMutation]);

  const handleEndReached = useCallback(() => {
    if (!commentsQuery.hasNextPage || commentsQuery.isFetchingNextPage) {
      return;
    }

    void commentsQuery.fetchNextPage();
  }, [commentsQuery]);

  const handleSubmitComment = useCallback(() => {
    if (!postId || !canSubmitComment) {
      return;
    }

    createCommentMutation.mutate(trimmedCommentText, {
      onSuccess: () => {
        setCommentText("");
        Keyboard.dismiss();
      },
    });
  }, [canSubmitComment, createCommentMutation, postId, trimmedCommentText]);

  if (!postId) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centerState}>
          <Text style={styles.errorText}>Некорректный идентификатор поста</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (postQuery.isPending && !post) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={tokens.colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  if (postQuery.isError || !post) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.centerState}>
          <Text style={styles.errorText}>Не удалось загрузить публикацию</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <PostDetailCommentRow comment={item} />
          </View>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.35}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom:
              COMPOSER_BASE_HEIGHT +
              Math.max(insets.bottom, 13) +
              tokens.spacing.md,
          },
        ]}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={styles.card}>
            <View style={styles.authorRow}>
              <Image
                source={{ uri: post.author.avatarUrl }}
                style={styles.avatar}
                contentFit="cover"
              />
              <Text style={styles.authorName}>{post.author.displayName}</Text>
            </View>

            <Image
              source={{ uri: post.coverUrl }}
              style={[styles.cover, { height: screenWidth }]}
              contentFit="cover"
            />

            <View style={styles.postBody}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.description}>
                {post.body || post.preview}
              </Text>
            </View>

            <View style={styles.metricsRow}>
              <PostLikeChip
                value={post.likesCount}
                active={post.isLiked}
                onPress={handleLikePress}
                disabled={toggleLikeMutation.isPending}
              />
              <MetricChip type="comment" value={post.commentsCount} />
            </View>

            <View style={styles.commentsSection}>
              <View style={styles.commentsHeader}>
                <Text style={styles.commentsCount}>{commentsLabel}</Text>
                <Text style={styles.commentsSort}>Сначала новые</Text>
              </View>
              {commentsQuery.isPending ? (
                <View style={styles.commentsLoader}>
                  <ActivityIndicator
                    size="small"
                    color={tokens.colors.accent}
                  />
                </View>
              ) : null}
            </View>
          </View>
        }
        ListFooterComponent={
          commentsQuery.isFetchingNextPage ? (
            <View style={styles.commentsLoader}>
              <ActivityIndicator size="small" color={tokens.colors.accent} />
            </View>
          ) : null
        }
      />

      <KeyboardStickyView
        offset={{ closed: 0, opened: 0 }}
        style={styles.composerContainer}
      >
        <View style={[styles.composer]}>
          <TextInput
            style={styles.input}
            placeholder="Ваш комментарий"
            placeholderTextColor={tokens.colors.inputPlaceholder}
            value={commentText}
            onChangeText={setCommentText}
            maxLength={500}
            returnKeyType="send"
            editable={!createCommentMutation.isPending}
            onSubmitEditing={handleSubmitComment}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              !canSubmitComment && styles.sendButtonDisabled,
              pressed && canSubmitComment && styles.sendButtonPressed,
            ]}
            disabled={!canSubmitComment}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmitComment }}
            accessibilityLabel="Отправить комментарий"
            onPress={handleSubmitComment}
          >
            <PaperPlaneIcon color={canSubmitComment ? tokens.colors.accent : tokens.colors.sendIcon} />
          </Pressable>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
}
