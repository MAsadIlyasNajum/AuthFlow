
/*
 * Created by Asad on 05 OCT 2025
 */

import React from 'react';
import './i18n';
import { AuthProvider } from './store/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { ThemeProvider } from './hooks/useTheme';
import StatusBar from './components/molecules/StatusBar';
import { I18nProvider } from './hooks/useI18n';

const App = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <StatusBar />
          <AppNavigator />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};
export default App;
