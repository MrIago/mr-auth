'use client'

import { useAuthStore } from '../../store/auth-store'
import { User } from '../../types/auth-types'

/**
 * Hook para verificar role específica
 * 
 * @param role - Role necessária
 * @returns boolean - true se usuário tem a role
 * 
 * @example
 * ```tsx
 * const isTeacher = useHasRole('professor')
 * 
 * if (isTeacher) {
 *   return <TeacherDashboard />
 * }
 * ```
 */
export function useHasRole(role: User['role']): boolean {
    return useAuthStore(state => state.user?.role === role)
} 