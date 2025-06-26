'use server'

import { cookies } from 'next/headers'
import { adminAuth, adminDb } from '@/firebase/firebase-admin'
import { User } from '../../types/auth-types'

// Tipos para os dados do Firestore
type FirestoreUserData = {
    plan: string;
    role: string;
}

// Configuração padrão de cookies seguros
const COOKIE_EXPIRES_IN = 60 * 60 * 24 * 5 * 1000 // 5 dias

const getSecureCookieConfig = (maxAge: number) => ({
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/'
})

// Helper para setar cookie com configuração segura
async function setSecureCookie(name: string, value: string, maxAge: number = COOKIE_EXPIRES_IN) {
    const cookieStore = await cookies()
    cookieStore.set(name, value, getSecureCookieConfig(maxAge))
}

// Helper para buscar ou criar dados do usuário no Firestore
async function getOrCreateUserData(uid: string): Promise<FirestoreUserData> {
    const userDocRef = adminDb.collection("users").doc(uid)
    const userDoc = await userDocRef.get()

    if (!userDoc.exists) {
        const defaultData: FirestoreUserData = {
            plan: "free",
            role: "aluno"
        }
        await userDocRef.set(defaultData)
        return defaultData
    }

    const userData = userDoc.data() as FirestoreUserData
    return {
        plan: userData.plan,
        role: userData.role
    }
}

// Helper para setar cookies de conveniência baseados nas permissões
async function setConvenienceCookies(userPermissions: FirestoreUserData) {
    const { role, plan } = userPermissions

    // Cookies baseados em role
    if (role === 'admin') {
        await setSecureCookie('isAdmin', 'true')
    }

    if (role === 'professor') {
        await setSecureCookie('isProfessor', 'true')
    }

    // Cookie baseado em plano
    if (plan !== 'free') {
        await setSecureCookie('hasPlan', 'true')
    }
}

export async function createSession(token: string): Promise<string | null> {
    try {
        // Verifica se o token é válido
        const decodedToken = await adminAuth.verifyIdToken(token)

        // Busca ou cria dados do usuário no Firestore
        const userPermissions = await getOrCreateUserData(decodedToken.uid)

        // Cria o cookie de sessão
        const sessionCookie = await adminAuth.createSessionCookie(token, {
            expiresIn: COOKIE_EXPIRES_IN
        })

        // Seta cookie principal de sessão
        await setSecureCookie('session', sessionCookie)

        // Monta e seta cookie com dados completos do usuário
        const userData: User = {
            role: userPermissions.role as User['role'],
            plan: userPermissions.plan,
            name: decodedToken.name || "",
            email: decodedToken.email || "",
            photo: decodedToken.picture || ""
        }
        await setSecureCookie('user', JSON.stringify(userData))

        // Seta cookies de conveniência para verificações rápidas
        await setConvenienceCookies(userPermissions)

        return userPermissions.role
    } catch (error) {
        console.error('Erro ao criar sessão:', error)
        return null
    }
}
