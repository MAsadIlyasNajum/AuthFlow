/*
 * Created by Asad on 04 OCT 2025
 */

import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Input from '../atoms/Input';

const visibleIcon = require('../../assets/icons/visible-icon.png');
const hideIcon = require('../../assets/icons/hide-icon.png');

type Props = TextInputProps & { error?: string; label?: string };

const PasswordInput: React.FC<Props> = ({ error, label, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();

  return (
    <View>
      <Input
        label={label}
        secureTextEntry={!visible}
        error={error}
        style={styles.input}
        {...rest}
      />
      <TouchableOpacity
        style={[styles.iconWrap, { right: 12 }]}
        onPress={() => setVisible((v) => !v)}
        activeOpacity={0.8}
      >
        <Image source={visible ? hideIcon : visibleIcon} style={[styles.icon, { tintColor: theme.colors.muted as any }]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    position: 'absolute',
    top: 14,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 22, height: 22, resizeMode: 'contain' },
  input: { paddingRight: 44 }
});

export default PasswordInput;
