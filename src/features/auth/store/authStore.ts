import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/types'

interface AuthState {
  token: string | null
  user: User | null
  setSession: (token: string, user: User) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: 'lost-found-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)
