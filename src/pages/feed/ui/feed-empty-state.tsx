import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { styles } from './feed-screen.styles';

const ILLUSTRATION_SOURCE = require('../../../../assets/illustration/illustration.png');

type FeedEmptyStateProps = {
  onGoHome: () => void;
};

export function FeedEmptyState({ onGoHome }: FeedEmptyStateProps) {
  return (
    <View style={styles.stateContainer}>
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
