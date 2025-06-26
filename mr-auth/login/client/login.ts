'use client'

import { auth } from '@/firebase/firebase-client'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { createSession } from '../server/createSession'

/**
 * Client-side login function
 * 
 * Executa login com Google, cria sessão segura no servidor e limpa auth local.
 * 
 * @returns Promise<string | false> - role do usuário se sucesso, false se erro
 * 
 * @example
 * ```typescript
 * import { login } from '[...]/mr-auth'
 * 
 * const handleLogin = async () => {
 *   const result = await login()
 *   if (result) {
 *     console.log('Login realizado, role:', result)
 *     // Redirecionar baseado no role
 *   } else {
 *     console.error('Erro no login')
 *   }
 * }
 * ```
 */
export async function login(): Promise<string | false> {
    try {
        // Login com google popup
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)

        // Get token do firebase auth
        const token = await result.user.getIdToken()

        // Cria sessão com cookie do token, 
        // busca dados do usuário no Firestore (cria se não existir)
        // seta cookies: session, user, isAdmin, isProfessor, hasPlan
        // recebe o role se deu certo ou null se deu erro
        const sessionCreated = await createSession(token)
        if (!sessionCreated) {
            throw new Error('Erro ao criar sessão')
        }

        // Logout do firebase auth client
        // apaga sessão local e usa apenas o cookie a partir daí
        await signOut(auth)

        // retorna o role se deu certo, para ser usado no client para redirecionar para o dashboard correspondente
        return sessionCreated
    } catch (error) {
        console.error('Erro no login:', error)
        return false
    }
}