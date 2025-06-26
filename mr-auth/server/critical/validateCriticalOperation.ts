/**
 * @fileoverview Nível 3 - Validação Crítica (Critical Auth)
 * 
 * Validação máxima para operações críticas com múltiplas camadas de segurança.
 * 
 * ⚡ Performance: ~150ms (validação completa)
 * 🔒 Segurança: Máxima (Firebase + Firestore + tempo + extras)
 * 🎯 Uso: Operações financeiras, deletar dados, alterações críticas
 * 
 * 🛡️ Validações:
 * - Session cookie válido pelo Firebase
 * - Dados sincronizados com Firestore
 * - Token com menos de 1 hora (segurança extra)
 * - Tratamento robusto de erros
 * 
 * ⚠️ IMPORTANTE:
 * - Use APENAS para operações críticas
 * - Tokens expiram em 1 hora para máxima segurança
 * - Rejeita tokens antigos mesmo que válidos
 * - Para operações sensíveis: pagamentos, deletar usuários, etc.
 * 
 * @example
 * ```typescript
 * export async function deleteUser(userId: string) {
 *   const user = await validateCriticalOperation()
 *   if (!user || user.role !== 'admin') {
 *     throw new Error('Sem permissão para operação crítica')
 *   }
 *   
 *   // Só executa se TUDO estiver válido
 *   await deleteUserFromDatabase(userId)
 * }
 * 
 * export async function processPayment(amount: number) {
 *   const user = await validateCriticalOperation()
 *   if (!user) {
 *     throw new Error('Validação crítica falhou')
 *   }
 *   
 *   // Processa pagamento com segurança máxima
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'
import { User } from '../../types/auth-types'
import { adminAuth, adminDb } from '@/firebase/firebase-admin'

// Helper para validação completa em operações críticas (nível máximo)
export async function validateCriticalOperation(): Promise<User | null> {
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get('session')?.value

        if (!sessionCookie) return null

        // Valida session cookie
        const decodedToken = await adminAuth.verifySessionCookie(sessionCookie)

        // Busca dados atualizados no Firestore
        const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get()
        if (!userDoc.exists) return null

        const firestoreData = userDoc.data()

        // Validações adicionais para operações críticas
        const now = Date.now()
        const tokenIssuedAt = decodedToken.iat * 1000
        const maxAge = 60 * 60 * 1000 // 1 hora para operações críticas

        if (now - tokenIssuedAt > maxAge) {
            throw new Error('Token muito antigo para operação crítica')
        }

        return {
            role: firestoreData?.role || 'aluno',
            plan: firestoreData?.plan || 'free',
            name: decodedToken.name || '',
            email: decodedToken.email || '',
            photo: decodedToken.picture || ''
        }
    } catch (error) {
        console.error('Erro na validação crítica:', error)
        return null
    }
} 