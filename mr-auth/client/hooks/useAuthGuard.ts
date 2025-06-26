'use client'

import { useAuth } from './useAuth'
import { User } from '../../types/auth-types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface UseAuthGuardOptions {
    redirectTo?: string;
    requiredRole?: User['role'];
    requiredPlan?: string;
    requireAuth?: boolean;
}

/**
 * Hook para proteção de rotas e componentes
 * 
 * @param options - Opções de proteção
 * @returns objeto com status de autorização
 * 
 * @example
 * ```tsx
 * // Proteger página que precisa estar logado
 * const { isAuthorized, isLoading } = useAuthGuard({ 
 *   requireAuth: true,
 *   redirectTo: '/login' 
 * })
 * 
 * // Proteger área de admin
 * const { isAuthorized } = useAuthGuard({ 
 *   requiredRole: 'admin',
 *   redirectTo: '/unauthorized' 
 * })
 * 
 * // Proteger feature premium
 * const { isAuthorized } = useAuthGuard({ 
 *   requiredPlan: 'premium' 
 * })
 * ```
 */
export function useAuthGuard(options: UseAuthGuardOptions = {}) {
    const {
        redirectTo = '/login',
        requiredRole,
        requiredPlan,
        requireAuth = true
    } = options

    const { user, status, isLoading } = useAuth()
    const router = useRouter()

    // Verifica se está autenticado
    const isAuthenticated = status === 'authenticated'

    // Verifica role se necessário
    const hasRequiredRole = !requiredRole || user?.role === requiredRole

    // Verifica plano se necessário
    const hasRequiredPlan = !requiredPlan || user?.plan === requiredPlan

    // Verifica hierarquia de permissões para roles
    const hasRolePermission = !requiredRole || (() => {
        if (!user) return false

        const roleHierarchy = { admin: 3, professor: 2, aluno: 1 }
        const userLevel = roleHierarchy[user.role] || 0
        const requiredLevel = roleHierarchy[requiredRole] || 0

        return userLevel >= requiredLevel
    })()

    // Status final de autorização
    const isAuthorized = (!requireAuth || isAuthenticated) &&
        hasRequiredRole &&
        hasRequiredPlan &&
        hasRolePermission

    // Redirecionamento automático
    useEffect(() => {
        if (!isLoading && !isAuthorized && redirectTo) {
            router.push(redirectTo)
        }
    }, [isLoading, isAuthorized, redirectTo, router])

    return {
        isAuthorized,
        isLoading,
        isAuthenticated,
        hasRequiredRole,
        hasRequiredPlan,
        hasRolePermission,
        user
    }
} 