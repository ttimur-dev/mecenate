import { StyleSheet } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

export const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xxs,
    borderRadius: tokens.radius.pill,
    paddingLeft: 6,
    paddingRight: tokens.spacing.sm,
    paddingVertical: 6,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: tokens.fonts.bold,
  },
});
