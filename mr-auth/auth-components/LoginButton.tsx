'use client'

import { useAuth } from '../client/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoginButtonProps {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

/**
 * Botão de login com Google
 * 
 * Gerencia automaticamente o estado de loading e execução do login.
 * 
 * @example
 * ```tsx
 * <LoginButton>
 *   Entrar com Google
 * </LoginButton>
 * 
 * <LoginButton variant="outline" size="lg">
 *   🚀 Começar agora
 * </LoginButton>
 * ```
 */
export function LoginButton({
    children = 'Entrar com Google',
    className,
    variant = 'default',
    size = 'default'
}: LoginButtonProps) {
    const { login, isLoading } = useAuth()

    const handleLogin = async () => {
        // Usa a action da store - gerencia estado automaticamente
        await login()
        // Store é atualizado automaticamente, página pode recarregar
    }

    return (
        <Button
            onClick={handleLogin}
            disabled={isLoading}
            variant={variant}
            size={size}
            className={className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                </>
            ) : (
                children
            )}
        </Button>
    )
} 