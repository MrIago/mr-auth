'use client'

import { logout as serverLogout } from '../server/ServerLogout'

/**
 * Client-side logout function
 * 
 * Executa logout seguro chamando server action e lida com erros.
 * 
 * @returns Promise<boolean> - true se logout foi bem-sucedido
 * 
 * @example
 * ```typescript
 * import { logout } from '[...]/mr-auth'
 * 
 * const handleLogout = async () => {
 *   const success = await logout()
 *   if (success) {
 *     router.push('/login')
 *   } else {
 *     console.error('Erro no logout')
 *   }
 * }
 * ```
 */
export async function logout(): Promise<boolean> {
    try {
        // Chama server action para logout seguro
        const result = await serverLogout()

        if (result) {
            // Server action já limpou os cookies
            // Store vai gerenciar a limpeza do estado
            return true
        }

        return false
    } catch (error) {
        console.error('Erro no logout client:', error)
        return false
    }
} 