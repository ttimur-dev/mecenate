import { useEffect, useRef, useState } from 'react';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { tokens } from '@/shared/theme/tokens';
import { CommentIcon, LikeOutlineIcon, LikeSolidIcon } from './post-icons';

type MetricChipProps = {
  type: 'like' | 'comment';
  value: number;
  active?: boolean;
};

type PostLikeChipProps = {
  value: number;
  active: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

type AnimatedCounterProps = {
  value: number;
  textStyle?: StyleProp<TextStyle>;
};

const COUNTER_HEIGHT = 18;
const ROLL_DURATION = 240;

function AnimatedCounter({ value, textStyle }: AnimatedCounterProps) {
  const [previousValue, setPreviousValue] = useState(value);
  const [currentValue, setCurrentValue] = useState(value);
  const [direction, setDirection] = useState<1 | -1>(1);
  const progress = useSharedValue(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (value === currentValue) {
      return;
    }

    const nextDirection: 1 | -1 = value > currentValue ? 1 : -1;

    setDirection(nextDirection);
    setPreviousValue(currentValue);
    setCurrentValue(value);
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: ROLL_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentValue, progress, value]);

  const previousAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -direction * progress.value * COUNTER_HEIGHT }],
    opacity: 1 - progress.value * 0.45,
  }));

  const currentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: direction * (1 - progress.value) * COUNTER_HEIGHT }],
    opacity: progress.value,
  }));

  return (
    <View style={styles.counterMask}>
      <Animated.Text style={[styles.valueText, textStyle, styles.counterMeasure]}>
        {Math.max(previousValue, currentValue)}
      </Animated.Text>
      <Animated.Text style={[styles.valueText, textStyle, styles.counterLayer, previousAnimatedStyle]}>
        {previousValue}
      </Animated.Text>
      <Animated.Text style={[styles.valueText, textStyle, styles.counterLayer, currentAnimatedStyle]}>
        {currentValue}
      </Animated.Text>
    </View>
  );
}

export function MetricChip({ type, value, active = false }: MetricChipProps) {
  const activeLike = type === 'like' && active;
  const backgroundColor = activeLike ? tokens.colors.likeActive : tokens.colors.actionBackground;
  const textColor = activeLike ? tokens.colors.likeActiveText : tokens.colors.textMuted;

  return (
    <View style={[styles.chip, { backgroundColor }]}>
      <View style={styles.icon}>
        {type === 'like' ? (
          activeLike ? (
            <LikeSolidIcon color={tokens.colors.likeActiveText} />
          ) : (
            <LikeOutlineIcon color={tokens.colors.textMuted} />
          )
        ) : (
          <CommentIcon color={tokens.colors.textMuted} />
        )}
      </View>
      <Text style={[styles.valueText, { color: textColor }]}>{value}</Text>
    </View>
  );
}

export function PostLikeChip({ value, active, onPress, disabled = false }: PostLikeChipProps) {
  const backgroundColor = active ? tokens.colors.likeActive : tokens.colors.actionBackground;
  const textColor = active ? tokens.colors.likeActiveText : tokens.colors.textMuted;
  const handlePress = () => {
    if (Platform.OS === 'android') {
      void Haptics.performAndroidHapticsAsync(
        active ? Haptics.AndroidHaptics.Toggle_Off : Haptics.AndroidHaptics.Toggle_On
      ).catch(() => undefined);
    } else {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    }

    onPress?.();
  };
  const content = (
    <>
      <View style={styles.icon}>
        {active ? (
          <LikeSolidIcon color={tokens.colors.likeActiveText} />
        ) : (
          <LikeOutlineIcon color={tokens.colors.textMuted} />
        )}
      </View>
      <AnimatedCounter value={value} textStyle={{ color: textColor }} />
    </>
  );

  if (onPress) {
    return (
      <Pressable
        disabled={disabled}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ disabled, selected: active }}
        accessibilityLabel={active ? 'Убрать лайк' : 'Поставить лайк'}
        style={({ pressed }) => [
          styles.chip,
          { backgroundColor },
          pressed && !disabled && styles.chipPressed,
          disabled && styles.chipDisabled,
        ]}>
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.chip, { backgroundColor }, disabled && styles.chipDisabled]}>{content}</View>;
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.xxs,
    borderRadius: tokens.radius.pill,
    paddingLeft: 6,
    paddingRight: tokens.spacing.sm,
    paddingVertical: 6,
  },
  chipPressed: {
    opacity: 0.92,
  },
  chipDisabled: {
    opacity: 0.7,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: tokens.fonts.bold,
    fontVariant: ['tabular-nums'],
  },
  counterMask: {
    height: 18,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  counterMeasure: {
    opacity: 0,
    fontVariant: ['tabular-nums'],
  },
  counterLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'left',
  },
});
