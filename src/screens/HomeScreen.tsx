/*
 * Created by Asad on 05 OCT 2025
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { useTheme } from '../hooks/useTheme';
import { LANGUAGE, useI18n } from '../hooks/useI18n';

const HomeScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, setLang, lang } = useI18n();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Text variant="h1" style={{ marginBottom: 8 }}>{t('welcome')},</Text>
        <Text variant="h2">{user?.name}</Text>
        <Text variant="body" style={{ marginTop: 4 }}>{user?.email}</Text>

        <View style={{ marginTop: 16 }}>
          <Button title={t('logout')} onPress={() => logout()} />
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
          <Button title={t('changeTheme')} onPress={() => toggleTheme()} variant="ghost" style={{ marginTop: 12 }} />
          <Button title={lang === LANGUAGE.EN ? 'BM' : 'EN'} onPress={() => setLang(lang === LANGUAGE.EN ? LANGUAGE.BM : LANGUAGE.EN)} variant="ghost" style={{ marginTop: 12 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 20, borderRadius: 16, width: '100%', maxWidth: 520, elevation: 6 },
});

export default HomeScreen;
