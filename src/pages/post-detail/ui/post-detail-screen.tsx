import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MetricChip, PaperPlaneIcon, usePostCommentsQuery, usePostDetailQuery } from "@/entities/post";
import { tokens } from "@/shared/theme/tokens";
import { getCommentsLabel } from "../lib/get-comments-label";
import { type CommentLikeMeta, PostDetailCommentRow } from "./post-detail-comment-row";
import { styles } from "./post-detail-screen.styles";

const COMMENT_LIKE_META: CommentLikeMeta[] = [
  { count: 2, active: false },
  { count: 3, active: true },
  { count: 2, active: false },
  { count: 2, active: false },
];

export default function PostDetailPage() {
  const params = useLocalSearchParams<{ id?: string }>();
  const postId = typeof params.id === "string" ? params.id : "";
  const { width: screenWidth } = useWindowDimensions();

  const postQuery = usePostDetailQuery(postId);
  const commentsQuery = usePostCommentsQuery(postId);

  const comments = commentsQuery.data ?? [];
  const commentsLabel = useMemo(() => getCommentsLabel(comments.length), [comments.length]);
  const post = postQuery.data;

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.authorRow}>
            <Image source={{ uri: post.author.avatarUrl }} style={styles.avatar} contentFit="cover" />
            <Text style={styles.authorName}>{post.author.displayName}</Text>
          </View>

          <Image source={{ uri: post.coverUrl }} style={[styles.cover, { height: screenWidth }]} contentFit="cover" />

          <View style={styles.postBody}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.body || post.preview}</Text>
          </View>

          <View style={styles.metricsRow}>
            <MetricChip type="like" value={post.likesCount} active={post.isLiked} />
            <MetricChip type="comment" value={post.commentsCount} />
          </View>

          <View style={styles.commentsSection}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsCount}>{commentsLabel}</Text>
              <Text style={styles.commentsSort}>Сначала новые</Text>
            </View>
            <View style={styles.commentsList}>
              {comments.slice(0, 4).map((comment, index) => (
                <PostDetailCommentRow
                  key={comment.id}
                  comment={comment}
                  likeMeta={COMMENT_LIKE_META[index] ?? COMMENT_LIKE_META[0]}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          placeholder="Ваш комментарий"
          placeholderTextColor={tokens.colors.inputPlaceholder}
        />
        <Pressable style={styles.sendButton}>
          <PaperPlaneIcon color={tokens.colors.sendIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
