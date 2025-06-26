'use client'

import { useEffect } from 'react'
import { AuthProviderProps } from '../types/auth-types'
import { useAuthStore } from '../store/auth-store'

/**
 * Provider de autenticação
 * 
 * Inicializa o estado de autenticação com dados do servidor (SSR) 
 * e gerencia a sincronização com cookies.
 * 
 * @example
 * ```tsx
 * // app/layout.tsx
 * export default async function RootLayout({ children }) {
 *   const initialUser = await getUserFromCookie()
 *   
 *   return (
 *     <html>
 *       <body>
 *         <AuthProvider initialUser={initialUser}>
 *           {children}
 *         </AuthProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function AuthProvider({ children, initialUser }: AuthProviderProps) {
    const initializeFromServer = useAuthStore(state => state.initializeFromServer)

    useEffect(() => {
        // Inicializa a store com dados do servidor (SSR)
        initializeFromServer(initialUser || null)
    }, [initializeFromServer, initialUser])

    return <>{children}</>
} 