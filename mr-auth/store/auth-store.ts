import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AuthStore, User, AuthStatus } from '../types/auth-types'
import { login as loginAction } from '../login/client/login'
import { logout as logoutAction } from '../logout/client/logout'

export const useAuthStore = create<AuthStore>()(
    devtools(
        (set, get) => ({
            // Estado inicial
            status: 'loading' as AuthStatus,
            user: null,
            isLoading: true,
            error: null,

            // Actions básicas
            setLoading: (loading: boolean) =>
                set({ isLoading: loading }, false, 'setLoading'),

            setUser: (user: User | null) =>
                set({
                    user,
                    status: user ? 'authenticated' : 'unauthenticated',
                    isLoading: false
                }, false, 'setUser'),

            setError: (error: string | null) =>
                set({ error, isLoading: false }, false, 'setError'),

            setStatus: (status: AuthStatus) =>
                set({ status }, false, 'setStatus'),

            // Inicializa store com dados do servidor (SSR)
            initializeFromServer: (user: User | null) =>
                set({
                    user,
                    status: user ? 'authenticated' : 'unauthenticated',
                    isLoading: false,
                    error: null
                }, false, 'initializeFromServer'),

            // Action de login
            login: async () => {
                set({ isLoading: true, error: null }, false, 'login:start')

                try {
                    const result = await loginAction()

                    if (result === false) {
                        set({
                            isLoading: false,
                            error: 'Erro no login',
                            status: 'unauthenticated'
                        }, false, 'login:error')
                        return false
                    }

                    // Após login, verifica autenticação para pegar dados completos
                    await get().checkAuth()
                    return get().user || false
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
                    set({
                        isLoading: false,
                        error: errorMessage,
                        status: 'unauthenticated'
                    }, false, 'login:catch')
                    return false
                }
            },

            // Action de logout
            logout: async () => {
                set({ isLoading: true, error: null }, false, 'logout:start')

                try {
                    const success = await logoutAction()

                    if (success) {
                        // Limpa estado imediatamente - não precisa de re-check
                        set({
                            user: null,
                            status: 'unauthenticated',
                            isLoading: false,
                            error: null
                        }, false, 'logout:success')
                    } else {
                        set({
                            isLoading: false,
                            error: 'Erro no logout'
                        }, false, 'logout:error')
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Erro no logout'
                    set({
                        isLoading: false,
                        error: errorMessage
                    }, false, 'logout:error')
                }
            },

            // Verifica autenticação atual (client-side)
            checkAuth: async () => {
                set({ isLoading: true, error: null }, false, 'checkAuth:start')

                try {
                    // Importa de forma dinâmica para evitar problemas de SSR
                    const { getUserFromCookie } = await import('../server/quick/getUserFromCookie')
                    const userData = await getUserFromCookie()

                    if (userData) {
                        const user: User = {
                            role: userData.role as User['role'],
                            plan: userData.plan,
                            name: userData.name,
                            email: userData.email,
                            photo: userData.photo
                        }

                        set({
                            user,
                            status: 'authenticated',
                            isLoading: false,
                            error: null
                        }, false, 'checkAuth:authenticated')
                    } else {
                        set({
                            user: null,
                            status: 'unauthenticated',
                            isLoading: false,
                            error: null
                        }, false, 'checkAuth:unauthenticated')
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Erro na verificação'
                    set({
                        user: null,
                        status: 'unauthenticated',
                        isLoading: false,
                        error: errorMessage
                    }, false, 'checkAuth:error')
                }
            },

            // Reset do estado
            reset: () =>
                set({
                    status: 'loading',
                    user: null,
                    isLoading: true,
                    error: null
                }, false, 'reset')
        }),
        {
            name: 'auth-store',
        }
    )
) 