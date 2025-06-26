/**
 * @fileoverview Nível 1 - Verificação Rápida (Quick Auth)
 * 
 * Recupera dados completos do usuário diretamente dos cookies httpOnly.
 * 
 * ⚡ Performance: ~2ms (ultra-rápido)
 * 🔒 Segurança: Alta (httpOnly + sameSite strict)
 * 🎯 Uso: UI/UX, renderização condicional, navegação
 * 
 * ⚠️ Importante: 
 * - Use apenas para exibição e navegação
 * - Para operações críticas, use funções do /secure ou /critical
 * - Dados podem estar desatualizados se alterados externamente
 * 
 * @example
 * ```typescript
 * const user = await getUserFromCookie()
 * if (user?.role === 'admin') {
 *   return <AdminDashboard />
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'
import { User } from '../../types/auth-types'

// Helper function para ler dados do usuário dos cookies
export async function getUserFromCookie(): Promise<User | null> {
    try {
        const cookieStore = await cookies()
        const userCookie = cookieStore.get('user')

        if (!userCookie?.value) {
            return null
        }

        return JSON.parse(userCookie.value) as User
    } catch (error) {
        console.error('Erro ao ler cookie do usuário:', error)
        return null
    }
} 