import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserManagementState, User } from '~/types';
import { users as initialUsers } from '~/data/users';

export const useUserManagementStore = create<UserManagementState>()(
  persist(
    (set, _) => ({
      users: initialUsers,
      isLoading: false,

      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date(),
        };
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },

      toggleUserStatus: (id) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, isActive: !user.isActive } : user
          ),
        }));
      },
    }),
    {
      name: 'user-management-storage',
      partialize: (state) => ({ users: state.users }),
    }
  )
);