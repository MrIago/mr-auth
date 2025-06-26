'use client'

import { useAuthStore } from '../../store/auth-store'

/**
 * Hook principal de autenticação
 * 
 * Fornece estado completo da autenticação e actions.
 * Usa Zustand internamente para gerenciamento de estado.
 * 
 * @example
 * ```tsx
 * const { user, isLoading, login, logout } = useAuth()
 * 
 * if (isLoading) return <Spinner />
 * if (!user) return <LoginButton onClick={login} />
 * return <UserProfile user={user} onLogout={logout} />
 * ```
 */
export function useAuth() {
    return useAuthStore()
} 