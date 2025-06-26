'use client'

import { useHasRole } from './useHasRole'

/**
 * Hook para verificar se é professor
 * 
 * @returns boolean - true se é professor
 * 
 * @example
 * ```tsx
 * const isProfessor = useIsProfessor()
 * 
 * if (isProfessor) {
 *   return <TeacherArea />
 * }
 * return <StudentArea />
 * ```
 */
export function useIsProfessor(): boolean {
    return useHasRole('professor')
} 