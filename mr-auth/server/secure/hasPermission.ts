/**
 * @fileoverview Nível 2 - Validação Segura (Secure Auth)
 * 
 * Verifica permissões hierárquicas com dados atualizados do Firestore.
 * 
 * ⚡ Performance: ~100ms (com validação e consulta DB)
 * 🔒 Segurança: Muito Alta (sessão + Firestore + hierarquia)
 * 🎯 Uso: Server actions, controle de acesso hierárquico
 * 
 * 👑 Hierarquia: admin (3) > professor (2) > aluno (1)
 * 
 * ✅ Validações:
 * - Session cookie válido
 * - Role atualizado do Firestore
 * - Hierarquia de permissões
 * 
 * @param requiredRole - Nível mínimo de permissão necessário
 * @returns true se usuário tem permissão igual ou superior
 * 
 * @example
 * ```typescript
 * // Admin pode acessar área de professor
 * if (await hasPermission('professor')) {
 *   return <TeacherArea />
 * }
 * 
 * // Server action restrita
 * export async function deleteContent() {
 *   if (!(await hasPermission('admin'))) {
 *     throw new Error('Apenas admins podem deletar')
 *   }
 * }
 * ```
 */
'use server'

import { getUserFromSession } from './getUserFromSession'

// Helper para verificar permissões específicas com validação de sessão
export async function hasPermission(requiredRole: 'admin' | 'professor' | 'aluno'): Promise<boolean> {
    try {
        const user = await getUserFromSession()
        if (!user) return false

        // Hierarquia de permissões: admin > professor > aluno
        const roleHierarchy = { admin: 3, professor: 2, aluno: 1 }
        const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0
        const requiredLevel = roleHierarchy[requiredRole]

        return userLevel >= requiredLevel
    } catch {
        return false
    }
} 