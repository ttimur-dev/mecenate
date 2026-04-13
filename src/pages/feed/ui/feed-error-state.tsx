import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { styles } from './feed-screen.styles';

const ILLUSTRATION_SOURCE = require('../../../../assets/illustration/illustration.png');

type FeedErrorStateProps = {
  onRetry: () => void;
};

export function FeedErrorState({ onRetry }: FeedErrorStateProps) {
  return (
    <View style={styles.stateContainer}>
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
    </View>
  );
}
