'use client'

import { useAuthStore } from '../../store/auth-store'

/**
 * Hook para verificar se usuário está autenticado
 * 
 * @returns boolean - true se autenticado
 * 
 * @example
 * ```tsx
 * const isAuthenticated = useIsAuthenticated()
 * 
 * if (isAuthenticated) {
 *   return <Dashboard />
 * }
 * return <LoginPage />
 * ```
 */
export function useIsAuthenticated(): boolean {
    return useAuthStore(state => state.status === 'authenticated')
} 