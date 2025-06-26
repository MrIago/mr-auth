/**
 * @fileoverview Nível 2 - Validação Segura (Secure Auth)
 * 
 * Recupera dados atualizados do usuário validando sessão e consultando Firestore.
 * 
 * ⚡ Performance: ~100ms (com validação e consulta DB)
 * 🔒 Segurança: Muito Alta (Firebase + Firestore sync)
 * 🎯 Uso: Server actions importantes, dados sempre atualizados
 * 
 * ✅ Validações:
 * - Session cookie válido pelo Firebase
 * - Dados sincronizados com Firestore
 * - Permissões atualizadas
 * 
 * ⚠️ Importante:
 * - Sempre retorna dados mais recentes do banco
 * - Use quando precisar de dados 100% atualizados
 * - Para operações críticas, prefira /critical
 * 
 * @example
 * ```typescript
 * export async function updateUserProfile(data: FormData) {
 *   const user = await getUserFromSession()
 *   if (!user) throw new Error('Não autenticado')
 *   
 *   // user.role sempre atualizado do Firestore
 *   if (user.role !== 'admin') {
 *     throw new Error('Sem permissão')
 *   }
 * }
 * ```
 */
'use server'

import { cookies } from 'next/headers'
import { User } from '../../types/auth-types'
import { adminAuth, adminDb } from '@/firebase/firebase-admin'

// Helper para validação com dados atualizados do Firestore (nível intermediário)
export async function getUserFromSession(): Promise<User | null> {
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

        return {
            role: firestoreData?.role || 'aluno',
            plan: firestoreData?.plan || 'free',
            name: decodedToken.name || '',
            email: decodedToken.email || '',
            photo: decodedToken.picture || ''
        }
    } catch (error) {
        console.error('Erro ao validar sessão:', error)
        return null
    }
} 