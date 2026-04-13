import { StyleSheet } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  listContent: {
    paddingBottom: tokens.spacing.xl,
  },
  listHeader: {
    marginBottom: tokens.spacing.md,
  },
  listSeparator: {
    height: tokens.spacing.md,
  },
  cardPressable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardPressablePressed: {
    opacity: 0.96,
  },
  stateContainer: {
    flex: 1,
    paddingTop: tokens.spacing.md,
  },
  stateCard: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    gap: tokens.spacing.md,
  },
  emptyStateCard: {
    flex: 1,
    justifyContent: 'center',
  },
  stateHeaderSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },
  stateHeaderAvatarSkeleton: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.skeleton,
  },
  stateHeaderLabelSkeleton: {
    width: 120,
    height: 20,
    borderRadius: 22,
    backgroundColor: tokens.colors.skeleton,
  },
  stateContent: {
    alignItems: 'center',
    gap: tokens.spacing.md,
  },
  stateIllustration: {
    width: 112,
    height: 112,
  },
  stateTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: tokens.fonts.bold,
    color: tokens.colors.text,
    textAlign: 'center',
  },
  stateButton: {
    backgroundColor: tokens.colors.accent,
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 8,
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateButtonText: {
    color: tokens.colors.surface,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.semiBold,
  },
  footerLoader: {
    paddingVertical: tokens.spacing.md,
  },
});
