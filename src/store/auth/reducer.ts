/*
 * Created by Asad on 04 OCT 2025
 */

import { State, Action } from './types';
import { AUTH_INIT, AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT } from './actions';

export const initialState: State = {
  user: null,
  loading: true,
  registeredUsers: [],
};

export function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case AUTH_INIT:
      return { ...state, user: action.payload.user, registeredUsers: action.payload.registeredUsers, loading: false };
    case AUTH_LOGIN:
      return { ...state, user: action.payload.user, loading: false };
    case AUTH_SIGNUP:
      return { ...state, user: action.payload.user, registeredUsers: action.payload.registeredUsers, loading: false };
    case AUTH_LOGOUT:
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
}
