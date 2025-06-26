'use client'

import { useHasRole } from './useHasRole'

/**
 * Hook para verificar se é admin
 * 
 * @returns boolean - true se é admin
 * 
 * @example
 * ```tsx
 * const isAdmin = useIsAdmin()
 * 
 * if (isAdmin) {
 *   return <AdminPanel />
 * }
 * return <div>Acesso negado</div>
 * ```
 */
export function useIsAdmin(): boolean {
    return useHasRole('admin')
} 