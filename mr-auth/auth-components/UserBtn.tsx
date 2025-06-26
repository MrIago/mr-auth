'use client'

import { useAuthStore } from "../store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { LogOut } from "lucide-react"
import { logout } from "../logout/client/logout"
import { useRouter } from "next/navigation"

export function UserBtn() {
    const { user } = useAuthStore()
    const router = useRouter()

    if (!user) return null

    async function handleLogout() {
        try {
            const success = await logout()
            if (success) {
                router.push('/')
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="w-10 h-10 border-2 border-primary transition-all hover:scale-105">
                    <AvatarImage src={user.photo} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mx-2">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 flex flex-wrap gap-2">
                    <Badge variant="outline" className="capitalize bg-primary text-white dark:bg-accent">
                        {user.role}
                    </Badge>
                    <Badge variant="outline" className="capitalize bg-primary text-white dark:bg-accent">
                        {user.plan}
                    </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-primary cursor-pointer hover:bg-destructive  dark:text-white"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
