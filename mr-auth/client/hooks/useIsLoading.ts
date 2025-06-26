'use client'

import { useAuthStore } from '../../store/auth-store'

/**
 * Hook para verificar se está carregando
 * 
 * @returns boolean - true se carregando
 * 
 * @example
 * ```tsx
 * const isLoading = useIsLoading()
 * 
 * if (isLoading) {
 *   return <Spinner />
 * }
 * ```
 */
export function useIsLoading(): boolean {
    return useAuthStore(state => state.isLoading)
} 