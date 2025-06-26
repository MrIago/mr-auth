'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/auth-store'

/**
 * Hook para inicialização manual da autenticação
 * 
 * Útil para casos onde você precisa verificar autenticação 
 * após mudanças (ex: após login/logout).
 * 
 * @example
 * ```tsx
 * const { isInitialized, reinitialize } = useInitializeAuth()
 * 
 * const handleLogin = async () => {
 *   await login()
 *   reinitialize() // Força nova verificação
 * }
 * ```
 */
export function useInitializeAuth() {
    const checkAuth = useAuthStore(state => state.checkAuth)
    const isLoading = useAuthStore(state => state.isLoading)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        if (!isLoading && !isInitialized) {
            setIsInitialized(true)
        }
    }, [isLoading, isInitialized])

    const reinitialize = async () => {
        setIsInitialized(false)
        await checkAuth()
    }

    return {
        isInitialized,
        reinitialize
    }
} 