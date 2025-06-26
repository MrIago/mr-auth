'use client'

import { useAuth } from '../client/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Loader2, LogOut } from 'lucide-react'

interface LogoutButtonProps {
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    showIcon?: boolean;
}

/**
 * Botão de logout
 * 
 * Gerencia automaticamente o estado de loading e execução do logout.
 * 
 * @example
 * ```tsx
 * <LogoutButton>
 *   Sair
 * </LogoutButton>
 * 
 * <LogoutButton variant="ghost" showIcon>
 *   Logout
 * </LogoutButton>
 * ```
 */
export function LogoutButton({
    children = 'Sair',
    className,
    variant = 'outline',
    size = 'default',
    showIcon = false
}: LogoutButtonProps) {
    const { logout, isLoading } = useAuth()

    const handleLogout = async () => {
        // Usa a action da store - gerencia estado automaticamente
        await logout()
        // Página recarrega automaticamente após logout
    }

    return (
        <Button
            onClick={handleLogout}
            disabled={isLoading}
            variant={variant}
            size={size}
            className={className}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saindo...
                </>
            ) : (
                <>
                    {showIcon && <LogOut className="mr-2 h-4 w-4" />}
                    {children}
                </>
            )}
        </Button>
    )
} 