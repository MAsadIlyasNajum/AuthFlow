
/*
 * Created by Asad on 04 OCT 2025
 */

import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps, StyleProp, TextStyle } from 'react-native';
import Text from './Text';
import { useTheme } from '../../hooks/useTheme';

type Props = TextInputProps & { label?: string; error?: string; style?: StyleProp<TextStyle> };

const Input: React.FC<Props> = ({ label, style, error, ...rest }) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginVertical: 8 }}>
      {label ? (
        <View style={{ marginBottom: 6 }}>
          <Text variant="caption">{label}</Text>
        </View>
      ) : null}
      <TextInput
        placeholderTextColor={theme.colors.muted as any}
        style={[
          styles.input,
          { backgroundColor: theme.colors.inputBg, color: theme.colors.text, borderColor: theme.colors.border },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <View style={{ marginTop: 6 }}>
          <Text style={{ color: theme.colors.danger }}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default Input;
