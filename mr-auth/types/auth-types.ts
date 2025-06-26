// Interface única do usuário (substitui AuthUser e UserCookie)
export interface User {
    role: 'admin' | 'professor' | 'aluno';
    plan: string; // 'free' ou qualquer outro plano
    name: string;
    email: string;
    photo: string;
}

// Estados de autenticação
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

// Estado completo da autenticação
export interface AuthState {
    status: AuthStatus;
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

// Actions do store Zustand
export interface AuthActions {
    setLoading: (loading: boolean) => void;
    setUser: (user: User | null) => void;
    setError: (error: string | null) => void;
    setStatus: (status: AuthStatus) => void;
    login: () => Promise<User | false>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    reset: () => void;
    initializeFromServer: (user: User | null) => void;
}

// Store completo
export interface AuthStore extends AuthState, AuthActions { }

// Props do AuthProvider
export interface AuthProviderProps {
    children: React.ReactNode;
    initialUser?: User | null;
}

// Contexto de autenticação (se necessário)
export interface AuthContextType extends AuthState, AuthActions { }

// Tipos legados para compatibilidade (deprecated - usar User)
/** @deprecated Use User instead */
export type UserCookie = User
/** @deprecated Use User instead */
export type AuthUser = User
