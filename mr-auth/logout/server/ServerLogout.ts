/* 

use server

revoga o token do cookie e faz logout do firebase auth admin

apaga os cookies:

- session
- hasRole e hasPlan se existirem



*/

'use server'

import { cookies } from 'next/headers'
import { adminAuth } from '@/firebase/firebase-admin'

/**
 * Server action para logout seguro
 * 
 * Revoga token do Firebase Admin e limpa todos os cookies de autenticação.
 * 
 * @returns boolean - true se logout foi bem-sucedido
 */
export async function logout(): Promise<boolean> {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get('session')

        if (session) {
            // Verifica e revoga o token de sessão
            const decodedToken = await adminAuth.verifySessionCookie(session.value)
            await adminAuth.revokeRefreshTokens(decodedToken.sub!)
        }

        // Lista de todos os cookies que podem existir
        const cookiesToDelete = [
            'session',      // Cookie principal de sessão
            'user',         // Dados completos do usuário
            'isAdmin',      // Flag admin
            'isProfessor',  // Flag professor
            'hasPlan'       // Flag plano pago
        ]

        // Apaga todos os cookies relacionados à autenticação
        cookiesToDelete.forEach(cookieName => {
            if (cookieStore.has(cookieName)) {
                cookieStore.delete(cookieName)
            }
        })

        return true
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
        return false
    }
}