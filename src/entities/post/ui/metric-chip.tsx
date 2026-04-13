import { Text, View } from 'react-native';

import { tokens } from '@/shared/theme/tokens';
import { CommentIcon, LikeOutlineIcon, LikeSolidIcon } from './post-icons';
import { styles } from './metric-chip.styles';

type MetricChipProps = {
  type: 'like' | 'comment';
  value: number;
  active?: boolean;
};

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
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
    </View>
  );
}
