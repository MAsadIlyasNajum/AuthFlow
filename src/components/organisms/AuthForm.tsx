/*
 * Created by Asad on 04 OCT 2025
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useI18n } from '../../hooks/useI18n';
import Input from '../atoms/Input';
import PasswordInput from '../molecules/PasswordInput';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import { AUTH_TITLES } from '../../constants/auth';

type Props = {
  mode: AuthMode;
  fields: AuthFields;
  setField: (key: keyof AuthFields, value: string) => void;
  onSubmit: () => void;
  errors: AuthErrors;
  loading?: boolean;
};

const AuthForm: React.FC<Props> = ({ mode, fields, setField, onSubmit, errors, loading }) => {
  const { t } = useI18n();

  return (
    <View style={styles.container}>
      {/* Dynamic Title Per Mode */}
      <Text variant="h2" style={styles.title}>
        {t(AUTH_TITLES[mode])}
      </Text>

      {/* Name only for signup */}
      {mode === 'signup' && (
        <Input
          placeholder={t('name')}
          value={fields.name || ''}
          onChangeText={(text) => setField('name', text)}
          error={errors.name}
        />
      )}

      {/* Email (always shown) */}
      <Input
        placeholder={t('email')}
        value={fields.email}
        onChangeText={(text) => setField('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      {/* Password shown for login + signup (hidden in reset if you want) */}
      {(mode === 'login' || mode === 'signup') && (
        <PasswordInput
          placeholder={t('password')}
          value={fields.password}
          onChangeText={(text) => setField('password', text)}
          error={errors.password}
        />
      )}

      <Button
        title={t(AUTH_TITLES[mode])}
        onPress={onSubmit}
        style={styles.button}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 6,
    marginTop: 12,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 12,
  },
});

export default AuthForm;
