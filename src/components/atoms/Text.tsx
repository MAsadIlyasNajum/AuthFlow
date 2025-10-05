/*
 * Created by Asad on 04 OCT 2025
 */

import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { typography, TypographyVariant } from '../../theme/typography';

type Props = TextProps & {
  variant?: TypographyVariant;
};

const Text: React.FC<Props> = ({
  children,
  variant = 'body',
  style,
  ...rest
}) => {
  const { theme } = useTheme();
  const typ = typography[variant];
  return (
    <RNText
      {...rest}
      style={[
        { color: theme.colors.text, fontSize: typ.fontSize, lineHeight: typ.lineHeight },
        styles.text,
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: { fontFamily: 'System' },
});

export default Text;
