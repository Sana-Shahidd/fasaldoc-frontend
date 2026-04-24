import { useMemo } from 'react'

function generateId(): string {
  return 'user_' + Math.random().toString(36).slice(2, 11)
}

export function useUserId(): string {
  return useMemo(() => {
    const stored = localStorage.getItem('fasaldoc_user_id')
    if (stored) return stored
    const id = generateId()
    localStorage.setItem('fasaldoc_user_id', id)
    return id
  }, [])
}
