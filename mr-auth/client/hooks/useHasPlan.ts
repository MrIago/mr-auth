'use client'

import { useAuthStore } from '../../store/auth-store'

/**
 * Hook para verificar plano específico
 * 
 * @param plan - Plano necessário
 * @returns boolean - true se usuário tem o plano
 * 
 * @example
 * ```tsx
 * const hasCustomPlan = useHasPlan('custom')
 * 
 * if (hasCustomPlan) {
 *   return <CustomFeatures />
 * }
 * ```
 */
export function useHasPlan(plan: string): boolean {
    return useAuthStore(state => state.user?.plan === plan)
} 