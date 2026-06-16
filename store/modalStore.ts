import { create } from "zustand";
import { Video, ModalType } from "@/types";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  videoId: string | null;
  message: string | null;
  onConfirm: (() => void) | null;
  openVideoModal: (videoId: string) => void;
  openSuccessModal: (message: string) => void;
  openErrorModal: (message: string) => void;
  openConfirmModal: (message: string, onConfirm: () => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  videoId: null,
  message: null,
  onConfirm: null,

  openVideoModal: (videoId) => set({ isOpen: true, type: "video", videoId }),
  openSuccessModal: (message) =>
    set({ isOpen: true, type: "success", message }),
  openErrorModal: (message) => set({ isOpen: true, type: "error", message }),
  openConfirmModal: (message, onConfirm) =>
    set({ isOpen: true, type: "confirm", message, onConfirm }),
  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      videoId: null,
      message: null,
      onConfirm: null,
    }),
}));
