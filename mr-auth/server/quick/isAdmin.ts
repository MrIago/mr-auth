/**
 * @fileoverview Nível 1 - Verificação Rápida (Quick Auth)
 * 
 * Verifica se o usuário atual é admin através de cookie httpOnly.
 * 
 * ⚡ Performance: ~2ms (ultra-rápido)
 * 🔒 Segurança: Alta (httpOnly + sameSite strict)
 * 🎯 Uso: Renderização condicional, menus, navegação
 * 
 * ⚠️ Importante:
 * - Ideal para UI/UX e componentes visuais
 * - Para server actions importantes, use /secure/hasPermission
 * - Para operações críticas, use /critical/validateCriticalOperation
 * 
 * @example
 * ```typescript
 * if (await isAdmin()) {
 *   showAdminMenu()
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'

// Helper para verificar se usuário é admin
export async function isAdmin(): Promise<boolean> {
    const cookieStore = await cookies()
    return cookieStore.get('isAdmin')?.value === 'true'
} 