/*
 * Created by Asad on 05 OCT 2025
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AuthForm from '../components/organisms/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { isEmail } from '../utils/validation';
import Text from '../components/atoms/Text';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/types';
import { AppRoutes } from '../navigation/routes';

type NavProp = NativeStackNavigationProp<RootStackParamList, AppRoutes.LOGIN>;

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const [fields, setFields] = useState<AuthFields>({ email: '', password: '' });
  const [errors, setErrors] = useState<AuthErrors>({});
  const { login } = useAuth();
  const nav = useNavigation<NavProp>();
  const { t } = useI18n();

  const setField = (k: string, v: any) => setFields((s) => ({ ...s, [k]: v }));

  const onSubmit = async () => {
    const e: Record<string, string | undefined> = {};
    if (!isEmail(fields.email)) e.email = t('invalidEmail');
    if (!fields.password) e.password = t('missingFields');

    setErrors(e);
    if (Object.keys(e).length) return;

    const res = await login(fields.email, fields.password);
    if (!res.ok) {
      setErrors({ password: t('incorrectCredentials') });
    }
  };

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <AuthForm mode="login" fields={fields} setField={setField} onSubmit={onSubmit} errors={errors} />
        <TouchableOpacity style={styles.link} onPress={() => nav.navigate(AppRoutes.SIGNUP)}>
          <Text style={styles.text}>{t('goToSignup')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    gap: 12,
  },
  link: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: { textAlign: 'center' }
});

export default LoginScreen;
