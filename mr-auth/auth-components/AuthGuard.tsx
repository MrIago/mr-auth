'use client'

import { useAuthGuard } from '../client/hooks/useAuthGuard'
import { User } from '../types/auth-types'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    loadingComponent?: React.ReactNode;
    requiredRole?: User['role'];
    requiredPlan?: string;
    requireAuth?: boolean;
    redirectTo?: string;
}

/**
 * Componente para proteção de conteúdo baseado em autenticação
 * 
 * @example
 * ```tsx
 * // Proteger conteúdo que precisa estar logado
 * <AuthGuard fallback={<LoginPrompt />}>
 *   <Dashboard />
 * </AuthGuard>
 * 
 * // Proteger área de admin
 * <AuthGuard 
 *   requiredRole="admin" 
 *   fallback={<UnauthorizedMessage />}
 * >
 *   <AdminPanel />
 * </AuthGuard>
 * 
 * // Proteger feature premium
 * <AuthGuard 
 *   requiredPlan="premium" 
 *   fallback={<UpgradePrompt />}
 * >
 *   <PremiumFeature />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({
    children,
    fallback = <div>Acesso negado</div>,
    loadingComponent = <DefaultLoading />,
    requiredRole,
    requiredPlan,
    requireAuth = true,
    redirectTo
}: AuthGuardProps) {
    const { isAuthorized, isLoading } = useAuthGuard({
        requiredRole,
        requiredPlan,
        requireAuth,
        redirectTo
    })

    if (isLoading) {
        return <>{loadingComponent}</>
    }

    if (!isAuthorized) {
        return <>{fallback}</>
    }

    return <>{children}</>
}

// Componente de loading padrão
function DefaultLoading() {
    return (
        <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Verificando acesso...</span>
        </div>
    )
} 