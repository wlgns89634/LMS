"use client";

import dynamic from "next/dynamic";
import { useProgress } from "@/hooks/useProgress";
import { ModalType } from "@/types";
import { useRef } from "react";
import type ReactPlayerType from "react-player";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface BaseProps {
  type: ModalType;
  onClose: () => void;
}

interface VideoModalProps extends BaseProps {
  type: "video";
  videoId: string;
}

interface SuccessModalProps extends BaseProps {
  type: "success";
  message: string;
}

interface ErrorModalProps extends BaseProps {
  type: "error";
  message: string;
}

interface ConfirmModalProps extends BaseProps {
  type: "confirm";
  message: string;
  onConfirm: () => void;
}

interface FormModalProps extends BaseProps {
  type: "form";
  children: React.ReactNode;
  onSubmit: (data: unknown) => void;
}

type ModalProps =
  | VideoModalProps
  | SuccessModalProps
  | ErrorModalProps
  | ConfirmModalProps
  | FormModalProps;

export default function Modal(props: ModalProps) {
  const { type, onClose } = props;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl">
        <button onClick={onClose} className="mb-2 text-sm text-gray-500">
          닫기
        </button>

        {type === "video" && <VideoContent {...props} />}
        {type === "success" && <SuccessContent {...props} />}
        {type === "error" && <ErrorContent {...props} />}
        {type === "confirm" && <ConfirmContent {...props} />}
        {type === "form" && <FormContent {...props} />}
      </div>
    </div>
  );
}

function VideoContent({ videoId }: VideoModalProps) {
  const { progress, updateProgress } = useProgress(videoId);
  const playerRef = useRef<ReactPlayerType>(null);
  console.log("videoId:", videoId);

  return (
    <ReactPlayer
      ref={playerRef}
      url={`https://www.youtube.com/watch?v=${videoId}`}
      controls
      width="100%"
      onReady={() => {
        if (progress?.percent) {
          playerRef.current?.seekTo(progress.percent / 100, "fraction");
        }
      }}
      onProgress={({ played }) => {
        updateProgress({ videoId, percent: played * 100 });
      }}
    />
  );
}

function SuccessContent({ message }: SuccessModalProps) {
  return <p className="text-green-500 text-center">✅ {message}</p>;
}

function ErrorContent({ message }: ErrorModalProps) {
  return <p className="text-red-500 text-center">❌ {message}</p>;
}

function ConfirmContent({ message, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <div className="text-center">
      <p className="mb-4">{message}</p>
      <button
        onClick={onConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        확인
      </button>
      <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
        취소
      </button>
    </div>
  );
}

function FormContent({ children, onSubmit }: FormModalProps) {
  return (
    <div>
      {children}
      <button
        onClick={() => onSubmit({})}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        제출
      </button>
    </div>
  );
}
