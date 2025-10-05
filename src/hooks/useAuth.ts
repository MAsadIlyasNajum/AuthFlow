/*
 * Created by Asad on 04 OCT 2025
 */

import { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
 