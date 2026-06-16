"use client";

import { useModalStore } from "@/store/modalStore";
import Modal from "@/components/VideoModal";

export default function ModalProvider() {
  const { isOpen, type, videoId, message, onConfirm, closeModal } =
    useModalStore();

  if (!isOpen || !type) return null;

  if (type === "video" && videoId) {
    return <Modal type="video" videoId={videoId} onClose={closeModal} />;
  }
  if (type === "success" && message) {
    return <Modal type="success" message={message} onClose={closeModal} />;
  }
  if (type === "error" && message) {
    return <Modal type="error" message={message} onClose={closeModal} />;
  }
  if (type === "confirm" && message && onConfirm) {
    return (
      <Modal
        type="confirm"
        message={message}
        onConfirm={onConfirm}
        onClose={closeModal}
      />
    );
  }

  return null;
}
