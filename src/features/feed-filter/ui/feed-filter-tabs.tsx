import { observer } from 'mobx-react-lite';
import { Pressable, Text, View } from 'react-native';

import type { FeedFilter } from '../model/types';
import { feedFilterStore } from '../model/feed-filter-store';
import { styles } from './feed-filter-tabs.styles';

type FeedTab = {
  key: FeedFilter;
  label: string;
};

const FILTER_TABS: FeedTab[] = [
  { key: 'all', label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];

export const FeedFilterTabs = observer(() => {
  return (
    <View style={styles.section}>
      <View style={styles.track}>
        {FILTER_TABS.map((tab) => {
          const isActive = feedFilterStore.activeFilter === tab.key;

          return (
            <Pressable
              key={tab.key}
              onPress={() => {
                feedFilterStore.setActiveFilter(tab.key);
              }}
              style={[styles.tabItem, isActive && styles.tabItemActive]}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
});
