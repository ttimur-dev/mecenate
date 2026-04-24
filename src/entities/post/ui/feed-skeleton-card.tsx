import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

function SkeletonBlock({
  width,
  height,
  borderRadius,
}: {
  width: number | `${number}%`;
  height: number;
  borderRadius: number;
}) {
  return <View style={[styles.skeletonBlock, { width, height, borderRadius }]} />;
}

export function FeedSkeletonCard() {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.card}>
      <View style={styles.authorRow}>
        <SkeletonBlock width={40} height={40} borderRadius={999} />
        <SkeletonBlock width={120} height={20} borderRadius={22} />
      </View>

      <View style={styles.mediaSection}>
        <SkeletonBlock width={'100%'} height={screenWidth} borderRadius={0} />
        <View style={styles.textSkeletons}>
          <SkeletonBlock width={164} height={26} borderRadius={22} />
          <SkeletonBlock width={'100%'} height={20} borderRadius={22} />
        </View>
      </View>

      <View style={styles.metricsSkeletons}>
        <SkeletonBlock width={64} height={36} borderRadius={22} />
        <SkeletonBlock width={64} height={36} borderRadius={22} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    overflow: 'hidden',
    gap: tokens.spacing.md,
  },
  skeletonBlock: {
    backgroundColor: tokens.colors.skeleton,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    paddingTop: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
  },
  mediaSection: {
    gap: tokens.spacing.xs,
  },
  textSkeletons: {
    gap: tokens.spacing.xs,
    paddingTop: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
  },
  metricsSkeletons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
  },
});
