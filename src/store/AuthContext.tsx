/*
 * Created by Asad on 04 OCT 2025
 */

import React, { createContext, useEffect, useReducer } from 'react';
import { loadAuth, saveAuth } from '../utils/storage';

import { authReducer, initialState } from './auth/reducer';
import { initAuth, loginUser, signupUser, logoutUser } from './auth/actions';
import { AuthContextType, RegisteredUser } from './auth/types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    (async () => {
      const stored = await loadAuth();
      const registeredUsers = stored?.registeredUsers || [];
      const user = stored?.user || null;
      dispatch(initAuth(user, registeredUsers));
    })();
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) return { ok: false, error: 'Missing credentials' };

    const registered = state.registeredUsers || [];
    const found = registered.find((u: RegisteredUser) => u.email === email && u.password === password);

    if (found) {
      const logged = { id: found.id, name: found.name, email: found.email };
      dispatch(loginUser(logged));
      await saveAuth({ user: logged, registeredUsers: registered });
      return { ok: true };
    }

    if (email === 'test@example.com' && password === 'password123') {
      const logged = { id: 'test-1', name: 'Test User', email };
      dispatch(loginUser(logged));
      await saveAuth({ user: logged, registeredUsers: registered });
      return { ok: true };
    }

    return { ok: false, error: 'Incorrect credentials' };
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return { ok: false, error: 'Missing fields' };

    const registered = [...state.registeredUsers];
    const exists = registered.find((u) => u.email === email);
    if (exists) return { ok: false, error: 'Email already registered' };

    const newUser = { id: `u-${Date.now()}`, name, email, password };
    registered.push(newUser);

    const logged = { id: newUser.id, name: newUser.name, email: newUser.email };
    dispatch(signupUser(logged, registered));
    await saveAuth({ user: logged, registeredUsers: registered });

    return { ok: true };
  };

  const logout = async () => {
    dispatch(logoutUser());
    const stored = await loadAuth();
    const registered = stored?.registeredUsers || state.registeredUsers || [];
    await saveAuth({ user: null, registeredUsers: registered });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
