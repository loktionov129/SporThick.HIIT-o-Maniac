import { create } from 'zustand';
import type { ModalState } from '@app-types/index';

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  options: null,
  openModal: (options) => set({ isOpen: true, options }),
  closeModal: () => set({ isOpen: false, options: null }),
}));
