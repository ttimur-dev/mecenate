import { StyleSheet } from 'react-native';

import { tokens } from '@/shared/theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: tokens.spacing.xs,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.lg,
  },
  errorText: {
    color: tokens.colors.text,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    fontFamily: tokens.fonts.bold,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    overflow: 'hidden',
    gap: tokens.spacing.md,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.border,
  },
  authorName: {
    color: tokens.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.bold,
  },
  cover: {
    width: '100%',
    backgroundColor: tokens.colors.border,
  },
  postBody: {
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.xs,
  },
  title: {
    color: tokens.colors.text,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: tokens.fonts.bold,
  },
  description: {
    color: tokens.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
  },
  commentsSection: {
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.xs,
    paddingBottom: tokens.spacing.sm,
  },
  commentsLoader: {
    paddingVertical: tokens.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentsCount: {
    color: tokens.colors.commentsCount,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.semiBold,
  },
  commentsSort: {
    color: tokens.colors.accent,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
  },
  commentItem: {
    backgroundColor: tokens.colors.surface,
    paddingHorizontal: tokens.spacing.md,
  },
  commentRow: {
    paddingVertical: tokens.spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
  },
  commentLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing.sm,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.border,
  },
  commentLabels: {
    flex: 1,
    gap: tokens.spacing.xxs,
  },
  commentAuthor: {
    color: tokens.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.bold,
  },
  commentText: {
    color: tokens.colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
  },
  composer: {
    backgroundColor: tokens.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: 13,
  },
  composerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colors.surface,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: tokens.spacing.lg,
    borderWidth: 2,
    borderColor: tokens.colors.actionBackground,
    paddingHorizontal: tokens.spacing.md,
    color: tokens.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
    backgroundColor: tokens.colors.surface,
  },
  sendButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
  sendButtonPressed: {
    opacity: 0.78,
  },
});
