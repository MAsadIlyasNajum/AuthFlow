/*
 * Created by Asad on 04 OCT 2025
 */

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
};

type AuthMode = 'login' | 'signup' | 'reset';

interface AuthFields {
  name?: string;
  email: string;
  password: string;
  // TODO: will add more fields in M2
}

// type AuthErrors = Record<keyof AuthFields, string>;

interface AuthErrors {
  name?: string;
  email?: string;
  password?: string;
}
