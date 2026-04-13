import { StyleSheet } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.md,
  },
  track: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.surface,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  tabItemActive: {
    backgroundColor: tokens.colors.accent,
  },
  tabText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: tokens.fonts.medium,
    color: tokens.colors.textMuted,
  },
  tabTextActive: {
    color: tokens.colors.surface,
    fontFamily: tokens.fonts.bold,
  },
});
