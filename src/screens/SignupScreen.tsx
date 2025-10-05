/*
 * Created by Asad on 05 OCT 2025
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AuthForm from '../components/organisms/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { isEmail, validatePassword } from '../utils/validation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useI18n } from '../hooks/useI18n';
import Text from '../components/atoms/Text';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/types';
import { AppRoutes } from '../navigation/routes';

type NavProp = NativeStackNavigationProp<RootStackParamList, AppRoutes.SIGNUP>;

const SignupScreen: React.FC = () => {
  const [fields, setFields] = useState<AuthFields>({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<AuthErrors>({});
  const { signup } = useAuth();
  const { theme } = useTheme();
  const nav = useNavigation<NavProp>();
  const { t } = useI18n();

  const setField = (k: string, v: string) => setFields((s) => ({ ...s, [k]: v }));

  const onSubmit = async () => {
    const e: Record<string, string | undefined> = {};
    if (!fields.name) e.name = t('missingFields');
    if (!isEmail(fields.email)) e.email = t('invalidEmail');
    const passwordErrorKey = validatePassword(fields.password);
    if (passwordErrorKey) e.password = t(passwordErrorKey);

    setErrors(e);
    if (Object.keys(e).length) return;

    const res = await signup(fields.name ?? '', fields.email, fields.password);
    if (!res.ok) {
      setErrors({ email: res.error });
    }
  };

  return (
    <View style={[styles.wrap,{backgroundColor: theme.colors.background}]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface as any }]}>
        <AuthForm mode={'signup'} fields={fields} setField={setField} onSubmit={onSubmit} errors={errors} />
        <TouchableOpacity style={styles.button} onPress={() => nav.navigate(AppRoutes.LOGIN)}>
          <Text>{t('goToLogin')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 4, gap: 12 },
  button: { marginTop: 10, alignItems: 'center' }
});

export default SignupScreen;
