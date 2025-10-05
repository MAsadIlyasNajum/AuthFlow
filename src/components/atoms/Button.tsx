/*
 * Created by Asad on 04 OCT 2025
 */

import React from 'react';
import { TouchableOpacity, Text as RNText, StyleSheet, ViewStyle, ActivityIndicator, StyleProp } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ title, onPress, style, variant = 'primary', loading = false, disabled = false }) => {
  const { theme } = useTheme();
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      style={[
        styles.btn,
        {
          backgroundColor: isPrimary ? (theme.colors as any).primary : 'transparent',
          borderColor: theme.colors.border,
          opacity: isDisabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? theme.colors.secondary : (theme.colors.text as string)} />
      ) : null}
      <RNText style={[styles.txt, { color: isPrimary ? theme.colors.secondary : theme.colors.text, marginLeft: loading ? 8 : 0 }]}>
        {title}
      </RNText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
