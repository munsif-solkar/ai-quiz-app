import { create } from "zustand";

interface ErrorState {
  error: string | null;
  setError: (errorMessage: string | null) => void;
}

const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  setError: (errorMessage) => set({ error: errorMessage }),
}));

export default useErrorStore;