'use client'

import { useAuthStore } from '../../store/auth-store'
import { User } from '../../types/auth-types'

/**
 * Hook para pegar apenas os dados do usuário
 * 
 * @returns User | null
 * 
 * @example
 * ```tsx
 * const user = useUser()
 * 
 * if (user) {
 *   return <div>Olá, {user.name}!</div>
 * }
 * return <div>Usuário não logado</div>
 * ```
 */
export function useUser(): User | null {
    return useAuthStore(state => state.user)
} 