import { FlatList, View } from 'react-native';

import { FeedSkeletonCard } from '@/entities/post';
import { FeedFilterTabs } from '@/features/feed-filter';
import { styles } from './feed-screen.styles';

const FEED_SKELETON_ITEMS = ['skeleton-0', 'skeleton-1', 'skeleton-2'];

export function FeedLoadingState() {
  return (
    <FlatList
      data={FEED_SKELETON_ITEMS}
      keyExtractor={(item) => item}
      renderItem={() => <FeedSkeletonCard />}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={<FeedFilterTabs />}
      ListHeaderComponentStyle={styles.listHeader}
      ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}
