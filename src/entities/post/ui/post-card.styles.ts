import { StyleSheet } from "react-native";

import { tokens } from "@/shared/theme/tokens";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    overflow: "hidden",
    gap: tokens.spacing.md,
  },
  cardContentPressable: {
    gap: tokens.spacing.md,
  },
  cardContentPressablePressed: {
    opacity: 0.97,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.border,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.md,
    fontFamily: tokens.fonts.bold,
  },
  mediaSection: {
    gap: tokens.spacing.xs,
  },
  coverWrap: {
    position: "relative",
  },
  title: {
    color: tokens.colors.text,
    fontSize: tokens.fontSize.lg,
    fontFamily: tokens.fonts.bold,
  },
  textSection: {
    paddingHorizontal: tokens.spacing.md,
    gap: tokens.spacing.xs,
  },
  previewWrapper: {
    height: 40,
    justifyContent: "center",
    position: "relative",
  },
  previewExpanded: {
    height: "auto",
  },
  preview: {
    color: tokens.colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
  },
  cover: {
    width: "100%",
    backgroundColor: tokens.colors.border,
  },
  paidOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: tokens.colors.overlay,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: tokens.spacing.md,
  },
  paidTopContent: {
    padding: tokens.spacing.sm,
    alignItems: "center",
    gap: tokens.spacing.xs,
  },
  paidIconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: tokens.colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  paidMessage: {
    color: tokens.colors.overlayText,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.semiBold,
    textAlign: "center",
  },
  donateButton: {
    marginTop: 1,
    width: 239,
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: tokens.colors.accent,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  donateButtonText: {
    color: tokens.colors.overlayText,
    fontSize: 15,
    lineHeight: 26,
    fontFamily: tokens.fonts.semiBold,
  },
  paidSkeletons: {
    paddingTop: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
    gap: tokens.spacing.xs,
  },
  skeletonTitle: {
    width: 164,
    height: 26,
    borderRadius: 22,
    backgroundColor: tokens.colors.skeleton,
  },
  skeletonText: {
    width: "100%",
    height: 40,
    borderRadius: 22,
    backgroundColor: tokens.colors.skeleton,
  },
  showMoreContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  showMoreFade: {
    width: 20,
    height: 20,
  },
  showMoreText: {
    color: tokens.colors.accent,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: tokens.fonts.medium,
    backgroundColor: tokens.colors.surface,
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
  },
});
