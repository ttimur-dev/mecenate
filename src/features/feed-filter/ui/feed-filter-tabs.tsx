import { Pressable, Text, View } from 'react-native';

import type { FeedFilter } from '../model/types';
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

type FeedFilterTabsProps = {
  activeFilter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
};

export function FeedFilterTabs({ activeFilter, onFilterChange }: FeedFilterTabsProps) {
  return (
    <View style={styles.section}>
      <View style={styles.track}>
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.key;

          return (
            <Pressable
              key={tab.key}
              onPress={() => {
                onFilterChange(tab.key);
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              style={[styles.tabItem, isActive && styles.tabItemActive]}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
