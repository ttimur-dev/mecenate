import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PostCard, type Post, useFeedPostsQuery } from '@/entities/post';
import { FeedFilterTabs, feedFilterStore } from '@/features/feed-filter';
import { ApiRequestError } from '@/shared/api';
import { tokens } from '@/shared/theme/tokens';
import { FeedEmptyState } from './feed-empty-state';
import { FeedErrorState } from './feed-error-state';
import { FeedLoadingState } from './feed-loading-state';
import { styles } from './feed-screen.styles';

const FeedPage = observer(() => {
  const router = useRouter();
  const query = useFeedPostsQuery(feedFilterStore.simulateError, feedFilterStore.activeFilter);

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

  const renderItem = useCallback(
    ({ item }: { item: Post }) => {
      const isPaid = item.tier === 'paid';

      return (
        <Pressable
          disabled={isPaid}
          style={({ pressed }) => [styles.cardPressable, pressed && styles.cardPressablePressed]}
          onPress={() => {
            if (isPaid) {
              return;
            }
            router.push({ pathname: '/post/[id]', params: { id: item.id } });
          }}>
          <PostCard post={item} />
        </Pressable>
      );
    },
    [router]
  );

  if (showInitialLoading) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedLoadingState />
      </SafeAreaView>
    );
  }

  if (showInitialError) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedErrorState onRetry={handleRetry} />
      </SafeAreaView>
    );
  }

  if (showInitialEmpty) {
    return (
      <SafeAreaView style={styles.screen}>
        <FeedEmptyState onGoHome={handleGoHome} />
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
        ListHeaderComponent={<FeedFilterTabs />}
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
