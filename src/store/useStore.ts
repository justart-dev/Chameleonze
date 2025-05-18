import { create } from "zustand";

interface StoreState {
  selectedOption: string; // 홈 화면에서 디스플레이 되는 화면 방식
  setSelectedOption: (option: string) => void;
  isExpanded: boolean;
  setExpanded: (prev: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  selectedOption: "chameleonze", // 기본값 설정
  setSelectedOption: (option) => set({ selectedOption: option }), // 상태 업데이트 함수
  isExpanded: false,
  setExpanded: (zoom) => set({ isExpanded: zoom }), // 확대 상태 업데이트 함수
}));

export default useStore;
