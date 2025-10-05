/*
 * Created by Asad on 04 OCT 2025
 */

export type RegisteredUser = { id: string; name: string; email: string; password: string };

export type State = {
    user: User | null;
    loading: boolean;
    registeredUsers: RegisteredUser[];
};

export type Action =
    | { type: 'INIT'; payload: { user: User | null; registeredUsers: RegisteredUser[] } }
    | { type: 'LOGIN'; payload: { user: User } }
    | { type: 'SIGNUP'; payload: { user: User; registeredUsers: RegisteredUser[] } }
    | { type: 'LOGOUT' };


export type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
    logout: () => Promise<void>;
};
