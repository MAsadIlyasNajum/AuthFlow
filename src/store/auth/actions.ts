/*
 * Created by Asad on 04 OCT 2025
 */

export const AUTH_INIT = 'INIT' as const;
export const AUTH_LOGIN = 'LOGIN' as const;
export const AUTH_SIGNUP = 'SIGNUP' as const;
export const AUTH_LOGOUT = 'LOGOUT' as const;

// Action creators (optional but useful for consistency)

import { Action, RegisteredUser } from './types';

export const initAuth = (user: User | null, registeredUsers: RegisteredUser[]): Action => ({
  type: AUTH_INIT,
  payload: { user, registeredUsers },
});

export const loginUser = (user: User): Action => ({
  type: AUTH_LOGIN,
  payload: { user },
});

export const signupUser = (user: User, registeredUsers: RegisteredUser[]): Action => ({
  type: AUTH_SIGNUP,
  payload: { user, registeredUsers },
});

export const logoutUser = (): Action => ({
  type: AUTH_LOGOUT,
});
