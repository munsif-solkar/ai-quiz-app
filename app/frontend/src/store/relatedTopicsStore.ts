import { create } from "zustand";

interface RelatedTopicsState {
  relatedTopics: string[];
  setRelatedTopics: (topics: string[]) => void;
}

const useRelatedTopicsStore = create<RelatedTopicsState>((set) => ({
  relatedTopics: [],
  setRelatedTopics: (topics) => set({ relatedTopics: topics }),
}));

export default useRelatedTopicsStore;