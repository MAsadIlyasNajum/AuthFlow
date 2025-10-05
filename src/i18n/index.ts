/*
 * Created by Asad on 05 OCT 2025
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// basic translations
const resources = {
  en: {
    translation: {
      login: 'Login',
      signup: 'Signup',
      logout: 'Logout',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      goToSignup: 'Go to Signup',
      goToLogin: 'Go to Login',
      invalidEmail: 'Invalid email format',
      missingFields: 'Please fill all fields',
      incorrectCredentials: 'Incorrect credentials',
      welcome: 'Welcome',
      changeLanguage: 'Change Language',
      changeTheme: 'Change Theme',
      createAccount: 'Create Account',
      passwordTooShort: 'Password must be at least 6 characters.',
      passwordMissingCapital: 'Password must contain at least one uppercase letter.',
      passwordMissingNumber: 'Password must include at least one number.',
      passwordMissingSpecial: 'Password must contain at least one special character.',
      passwordRequirementsFail: 'Password does not meet requirements.',
    },
  },
  bm: {
    translation: {
      login: 'Log Masuk',
      signup: 'Daftar',
      logout: 'Keluar',
      email: 'Emel',
      password: 'Kata Laluan',
      name: 'Nama',
      goToSignup: 'Pergi ke Daftar',
      goToLogin: 'Pergi ke Log Masuk',
      invalidEmail: 'Format emel tidak sah',
      missingFields: 'Sila isi semua medan',
      incorrectCredentials: 'Maklumat tidak tepat',
      welcome: 'Selamat Datang',
      changeLanguage: 'Tukar Bahasa',
      changeTheme: 'Tukar Tema',
      createAccount: 'Buat Akaun',
      passwordTooShort: 'Kata laluan mestilah sekurang-kurangnya 6 aksara.',
      passwordMissingCapital: 'Kata laluan mesti mengandungi sekurang-kurangnya satu huruf besar.',
      passwordMissingNumber: 'Kata laluan mesti mengandungi sekurang-kurangnya satu nombor.',
      passwordMissingSpecial: 'Kata laluan mesti mengandungi sekurang-kurangnya satu aksara khas.',
      passwordRequirementsFail: 'Kata laluan tidak memenuhi keperluan.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
