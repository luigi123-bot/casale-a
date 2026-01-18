import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginResponse } from '~/types';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      session: null,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Simulate API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          if (!response.ok) throw new Error('Login failed');
          const data: LoginResponse = await response.json();
          const session = {
            user: data.user,
            token: data.token,
            expiresAt: new Date(data.expiresAt),
          };
          set({ session, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout: () => {
        set({ session: null });
      },
      refreshSession: async () => {
        // Implement refresh logic
        // For now, placeholder
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ session: state.session }),
    }
  )
);