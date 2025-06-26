/**
 * @fileoverview Nível 1 - Verificação Rápida (Quick Auth)
 * 
 * Verifica se o usuário possui plano pago através de cookie httpOnly.
 * 
 * ⚡ Performance: ~2ms (ultra-rápido)
 * 🔒 Segurança: Alta (httpOnly + sameSite strict)
 * 🎯 Uso: Renderização condicional, features premium, UI
 * 
 * ⚠️ Importante:
 * - Ideal para mostrar/ocultar features premium na UI
 * - Para validações de pagamento, use /secure ou /critical
 * - Para operações financeiras, sempre use /critical
 * 
 * @example
 * ```typescript
 * if (await hasPaidPlan()) {
 *   return <PremiumFeatures />
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'

// Helper para verificar se usuário tem plano pago
export async function hasPaidPlan(): Promise<boolean> {
    const cookieStore = await cookies()
    return cookieStore.get('hasPlan')?.value === 'true'
} 