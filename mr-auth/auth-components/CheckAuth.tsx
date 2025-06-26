'use client'

import { LoginButton, UserBtn, LogoutButton } from './'
import { useAuth } from '../client/hooks'

interface CheckAuthProps {
    children?: React.ReactNode
    loadingComponent?: React.ReactNode
    authenticatedComponent?: React.ReactNode
    unauthenticatedComponent?: React.ReactNode
    showDebugInfo?: boolean
    title?: string
    subtitle?: string
    showThemeToggle?: boolean
    ThemeToggleComponent?: React.ComponentType
    showQuickTest?: boolean
}

export function CheckAuth({
    children,
    loadingComponent,
    authenticatedComponent,
    unauthenticatedComponent,
    showDebugInfo = false,
    title,
    subtitle,
    showThemeToggle = false,
    ThemeToggleComponent,
    showQuickTest = false
}: CheckAuthProps) {
    const { user, isLoading, status } = useAuth();

    // Componente de teste rápido do auth
    const QuickTestComponent = () => (
        <div className="flex flex-col items-center space-y-6 p-6 bg-muted/50 rounded-lg border">
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">🧪 Teste Rápido do Auth</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Sistema de autenticação funcionando perfeitamente!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                <div className="text-center p-3 bg-background rounded border">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="font-mono text-sm text-green-600">✅ {status}</p>
                </div>

                <div className="text-center p-3 bg-background rounded border">
                    <p className="text-xs text-muted-foreground">Role</p>
                    <p className="font-mono text-sm">{user?.role || 'user'}</p>
                </div>

                <div className="text-center p-3 bg-background rounded border">
                    <p className="text-xs text-muted-foreground">Plan</p>
                    <p className="font-mono text-sm">{user?.plan || 'free'}</p>
                </div>

                <div className="text-center p-3 bg-background rounded border">
                    <p className="text-xs text-muted-foreground">Admin</p>
                    <p className="font-mono text-sm">{user?.role === 'admin' ? '✅' : '❌'}</p>
                </div>
            </div>

            <div className="flex gap-3">
                <LogoutButton variant="outline" size="sm">
                    Logout
                </LogoutButton>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="w-full flex h-16 items-center justify-between px-2">
                    {/* Left side - Auth buttons */}
                    <div className="flex items-center">
                        {status === 'authenticated' && user ? (
                            <UserBtn />
                        ) : (
                            <LoginButton variant="outline" size="sm">
                                Login
                            </LoginButton>
                        )}
                    </div>

                    {/* Right side - Theme toggle */}
                    <div className="flex items-center">
                        {showThemeToggle && ThemeToggleComponent && <ThemeToggleComponent />}
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">

                {/* Título principal */}
                {title && (
                    <h1 className="text-8xl font-bold font-logo text-primary dark:text-primary-foreground mb-8">
                        {title}
                    </h1>
                )}

                {/* Subtítulo */}
                {subtitle && (
                    <p className="text-xl text-muted-foreground mb-8 text-center">
                        {subtitle}
                    </p>
                )}

                {/* Loading state */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center space-y-8">
                        {loadingComponent || (
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                <span>Verificando autenticação...</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Conteúdo principal */}
                {!isLoading && (
                    <div className="flex flex-col items-center space-y-6">
                        {status === 'authenticated' && user ? (
                            // Usuário logado
                            authenticatedComponent || (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-center">
                                        <p className="text-lg text-muted-foreground mb-2">
                                            Bem-vindo de volta! 👋
                                        </p>
                                    </div>

                                    {/* Teste rápido do auth */}
                                    {showQuickTest && <QuickTestComponent />}
                                </div>
                            )
                        ) : (
                            // Usuário não logado
                            unauthenticatedComponent || (
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="text-center mb-4">
                                        <p className="text-xl text-muted-foreground mb-2">
                                            Faça login para continuar
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Entre com sua conta para acessar o sistema
                                        </p>
                                    </div>

                                    <LoginButton size="lg">
                                        Entrar com Google
                                    </LoginButton>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Conteúdo adicional passado como children */}
                {children}

                {/* Status Debug (apenas em desenvolvimento) */}
                {showDebugInfo && process.env.NODE_ENV === 'development' && (
                    <div className="p-3 bg-muted rounded-lg text-xs font-mono">
                        <div>Status: {status}</div>
                        <div>Loading: {isLoading ? 'true' : 'false'}</div>
                        {user && (
                            <>
                                <div>Role: {user.role}</div>
                                <div>Plan: {user.plan}</div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
} 