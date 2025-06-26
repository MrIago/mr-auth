/**
 * @fileoverview Nível 2 - Validação Segura (Secure Auth)
 * 
 * Verifica se a sessão do usuário é válida através do Firebase Admin SDK.
 * 
 * ⚡ Performance: ~50ms (rápido com validação)
 * 🔒 Segurança: Muito Alta (Firebase Admin validation)
 * 🎯 Uso: Middleware, guards, server actions moderadas
 * 
 * ✅ Validações:
 * - Session cookie existe
 * - Session cookie é válido pelo Firebase
 * - Token não expirou
 * 
 * @example
 * ```typescript
 * // Middleware
 * if (!(await hasValidSession())) {
 *   return NextResponse.redirect('/login')
 * }
 * 
 * // Server Action
 * export async function updateProfile() {
 *   if (!(await hasValidSession())) {
 *     throw new Error('Sessão inválida')
 *   }
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'
import { adminAuth } from '@/firebase/firebase-admin'

// Helper para verificar se tem sessão válida (nível intermediário)
export async function hasValidSession(): Promise<boolean> {
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('session')?.value

        if (!sessionCookie) return false

        // Valida o session cookie com Firebase Admin
        await adminAuth.verifySessionCookie(sessionCookie)
        return true
    } catch {
        return false
    }
} 