'use client'

import { useAuthStore } from '../../store/auth-store'

/**
 * Hook para verificar se tem plano pago (não-free)
 * 
 * @returns boolean - true se plano não é 'free'
 * 
 * @example
 * ```tsx
 * const hasPaidPlan = useHasPaidPlan()
 * 
 * if (hasPaidPlan) {
 *   return <PremiumFeatures />
 * }
 * return <FreeFeatures />
 * ```
 */
export function useHasPaidPlan(): boolean {
    return useAuthStore(state =>
        state.user?.plan !== 'free' && state.user?.plan !== null
    )
} 