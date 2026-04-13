import { StyleSheet } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

export const styles = StyleSheet.create({
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
