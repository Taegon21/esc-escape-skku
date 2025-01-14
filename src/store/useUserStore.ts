import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  phone: string;
  nickname: string;
  setPhone: (phone: string) => void;
  setNickname: (nickname: string) => void;
  clearUserInfo: () => void;
  isLoggedIn: () => boolean;
}

const localStoragePersist = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      phone: '',
      nickname: '',
      setPhone: (phone: string) => set(() => ({ phone })),
      setNickname: (nickname: string) => set(() => ({ nickname })),
      clearUserInfo: () => set({ phone: '', nickname: '' }),

      isLoggedIn: () => {
        const { phone } = get();
        return !!phone;
      },
    }),
    {
      name: 'user-storage',
      storage: localStoragePersist,
    }
  )
);
