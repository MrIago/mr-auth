// 🎨 mr-auth
// A zero-config React/Next.js auth management system
// Built and tested on Next.js 15 with React 19

// ===== TIPOS =====
export type {
  User,
  AuthStatus,
  AuthState,
  AuthActions,
  AuthStore,
  AuthProviderProps,
  AuthContextType,
  // Tipos legados para compatibilidade
  UserCookie,
  AuthUser
} from './types/auth-types'

// ===== PROVIDER =====
export { AuthProvider } from './auth-components/auth-provider'

// ===== STORE =====
export { useAuthStore } from './store/auth-store'

// ===== HOOKS =====
// Hook principal
export { useAuth } from './client/hooks/useAuth'

// Hooks de estado
export { useIsAuthenticated } from './client/hooks/useIsAuthenticated'
export { useIsLoading } from './client/hooks/useIsLoading'
export { useUser } from './client/hooks/useUser'

// Hooks de role
export { useHasRole } from './client/hooks/useHasRole'
export { useIsAdmin } from './client/hooks/useIsAdmin'
export { useIsProfessor } from './client/hooks/useIsProfessor'

// Hooks de plano
export { useHasPlan } from './client/hooks/useHasPlan'
export { useHasPaidPlan } from './client/hooks/useHasPaidPlan'

// Hook de proteção
export { useAuthGuard } from './client/hooks/useAuthGuard'

// Hook de inicialização
export { useInitializeAuth } from './client/hooks/useInitializeAuth'

// ===== COMPONENTES =====
export { LoginButton } from './auth-components/LoginButton'
export { LogoutButton } from './auth-components/LogoutButton'
export { AuthGuard } from './auth-components/AuthGuard'
export { UserBtn } from './auth-components/UserBtn'
export { CheckAuth } from './auth-components/CheckAuth'

// ===== FUNÇÕES DE LOGIN/LOGOUT =====
// Client
export { login } from './login/client/login'
export { logout } from './logout/client/logout'

// Server
export { createSession } from './login/server/createSession'
export { logout as serverLogout } from './logout/server/ServerLogout'

// ===== FUNÇÕES DE SERVIDOR =====
// Quick (operações rápidas baseadas em cookies)
export { getUserFromCookie } from './server/quick/getUserFromCookie'
export { hasPaidPlan } from './server/quick/hasPaidPlan'
export { isAdmin } from './server/quick/isAdmin'
export { isProfessor } from './server/quick/isProfessor'

// Secure (operações seguras baseadas em sessão)
export { getUserFromSession } from './server/secure/getUserFromSession'
export { hasValidSession } from './server/secure/hasValidSession'
export { hasPermission } from './server/secure/hasPermission'

// Critical (operações críticas com validação extra)
export { validateCriticalOperation } from './server/critical/validateCriticalOperation'

// ===== EXEMPLO DE USO =====
/*
// 1. Instale as dependências:
// npm install firebase firebase-admin zustand

// 2. Configure o Firebase em @firebase/firebase.ts e @firebase/firebase-admin.ts

// 3. Use no seu layout principal:
import { AuthProvider, getUserFromCookie } from '@[...]/mr-auth'

export default async function RootLayout({ children }) {
  const initialUser = await getUserFromCookie()
  
  return (
    <html>
      <body>
        <AuthProvider initialUser={initialUser}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

// 4. Use nos componentes:
import { useAuth, LoginButton, LogoutButton, AuthGuard } from '@[...]/mr-auth'

export default function MyComponent() {
  const { user, isAuthenticated } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Olá, {user?.name}!</p>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
      
      <AuthGuard requiredRole="admin">
        <AdminPanel />
      </AuthGuard>
    </div>
  )
}
*/
