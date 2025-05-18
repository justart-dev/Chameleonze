import { create } from "zustand";

interface StoreState {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const useStore = create<StoreState>((set) => ({
  selectedOption: "chameleonze", // 기본값 설정
  setSelectedOption: (option) => set({ selectedOption: option }), // 상태 업데이트 함수
}));

export default useStore;
