import type { ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Image } from 'expo-image';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  FeedSkeletonCard,
  PostCard,
  type Post,
  useFeedPostsQuery,
  useTogglePostLikeMutation,
} from '@/entities/post';
import { FeedFilterTabs, feedFilterStore, type FeedFilter } from '@/features/feed-filter';
import { ApiRequestError } from '@/shared/api';
import { tokens } from '@/shared/theme/tokens';
import { styles } from './feed-screen.styles';

const ILLUSTRATION_SOURCE = require('../../../../assets/illustration/illustration.png');
const FEED_SKELETON_ITEMS = ['skeleton-0', 'skeleton-1', 'skeleton-2'];
const ERROR_ITEMS = ['error-0', 'error-1', 'error-2'];

type FeedStateProps = {
  filterTabs: ReactElement;
};

type FeedErrorStateProps = FeedStateProps & {
  onRetry: () => void;
};

type FeedEmptyStateProps = FeedStateProps & {
  onGoHome: () => void;
};

function FeedPostCard({ post }: { post: Post }) {
  const router = useRouter();
  const toggleLikeMutation = useTogglePostLikeMutation(post.id);

  const handleOpenPost = useCallback(() => {
    if (post.tier === 'paid') {
      return;
    }

    router.push({ pathname: '/post/[id]', params: { id: post.id } });
  }, [post.id, post.tier, router]);

  const handleLikePress = useCallback(() => {
    if (toggleLikeMutation.isPending) {
      return;
    }

    toggleLikeMutation.mutate();
  }, [toggleLikeMutation]);

  return (
    <PostCard
      post={post}
      onPress={handleOpenPost}
      onPressLike={post.tier === 'paid' ? undefined : handleLikePress}
      likeDisabled={toggleLikeMutation.isPending}
    />
  );
}

function FeedLoadingState({ filterTabs }: FeedStateProps) {
  return (
    <FlatList
      data={FEED_SKELETON_ITEMS}
      keyExtractor={(item) => item}
      renderItem={() => <FeedSkeletonCard />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={filterTabs}
      ListHeaderComponentStyle={styles.listHeader}
      ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function FeedErrorState({ filterTabs, onRetry }: FeedErrorStateProps) {
  return (
    <FlatList
      data={ERROR_ITEMS}
      keyExtractor={(item) => item}
      renderItem={() => (
        <View style={styles.stateCard}>
          <View style={styles.stateHeaderSkeleton}>
            <View style={styles.stateHeaderAvatarSkeleton} />
            <View style={styles.stateHeaderLabelSkeleton} />
          </View>

          <View style={styles.stateContent}>
            <Image source={ILLUSTRATION_SOURCE} style={styles.stateIllustration} contentFit="contain" />
            <Text style={styles.stateTitle}>Не удалось загрузить публикацию</Text>
          </View>

          <Pressable onPress={onRetry} style={styles.stateButton}>
            <Text style={styles.stateButtonText}>Повторить</Text>
          </Pressable>
        </View>
      )}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={filterTabs}
      ListHeaderComponentStyle={styles.listHeader}
      ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

function FeedEmptyState({ filterTabs, onGoHome }: FeedEmptyStateProps) {
  return (
    <View style={styles.stateContainer}>
      {filterTabs}
      <View style={[styles.stateCard, styles.emptyStateCard]}>
        <View style={styles.stateContent}>
          <Image source={ILLUSTRATION_SOURCE} style={styles.stateIllustration} contentFit="contain" />
          <Text style={styles.stateTitle}>По вашему запросу ничего не найдено</Text>
        </View>

        <Pressable onPress={onGoHome} style={styles.stateButton}>
          <Text style={styles.stateButtonText}>На главную</Text>
        </Pressable>
      </View>
    </View>
  );
}

const FeedPage = observer(() => {
  const activeFilter = feedFilterStore.activeFilter;
  const query = useFeedPostsQuery(feedFilterStore.simulateError, activeFilter);

  const posts = useMemo(() => query.data?.pages.flatMap((page) => page.posts) ?? [], [query.data]);
  const isRefreshing = query.isRefetching && !query.isFetchingNextPage;
  const isServer500 = query.error instanceof ApiRequestError && query.error.status === 500;
  const showInitialLoading = query.isPending && posts.length === 0;
  const showInitialError = query.isError && !isServer500 && posts.length === 0;
  const showInitialEmpty =
    (!query.isPending && !query.isError && posts.length === 0) ||
    (query.isError && isServer500 && posts.length === 0);

  const handleRetry = useCallback(() => {
    void query.refetch();
  }, [query]);

  const handleFilterChange = useCallback((filter: FeedFilter) => {
    feedFilterStore.setActiveFilter(filter);
  }, []);

  const handleGoHome = useCallback(() => {
    if (feedFilterStore.activeFilter !== 'all') {
      feedFilterStore.setActiveFilter('all');
      return;
    }

    void query.refetch();
  }, [query]);

  const handleEndReached = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) {
      return;
    }

    void query.fetchNextPage();
  }, [query]);

  const renderItem = useCallback(({ item }: { item: Post }) => <FeedPostCard post={item} />, []);
  const filterTabs = <FeedFilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />;

  if (showInitialLoading) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedLoadingState filterTabs={filterTabs} />
      </SafeAreaView>
    );
  }

  if (showInitialError) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedErrorState filterTabs={filterTabs} onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (showInitialEmpty) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedEmptyState filterTabs={filterTabs} onGoHome={handleGoHome} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.35}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={filterTabs}
        ListHeaderComponentStyle={styles.listHeader}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRetry} />}
        ListFooterComponent={
          query.isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={tokens.colors.accent} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
});

export default FeedPage;
