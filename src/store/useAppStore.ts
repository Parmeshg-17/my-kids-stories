import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  continueReading: { [key: string]: number }; // storyId -> progress
  updateProgress: (id: string, progress: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      bookmarks: [],
      addBookmark: (id) => set((state) => ({ bookmarks: [...new Set([...state.bookmarks, id])] })),
      removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks.filter((b) => b !== id) })),
      continueReading: {},
      updateProgress: (id, progress) => set((state) => ({
        continueReading: { ...state.continueReading, [id]: progress }
      })),
    }),
    {
      name: 'story-app-storage',
    }
  )
);
