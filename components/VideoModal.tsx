"use client";

import dynamic from "next/dynamic";

interface Props {
  videoId: string;
  onClose: () => void;
}

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoModal({ videoId, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl">
        <button onClick={onClose} className="mb-2 text-sm text-gray-500">
          닫기
        </button>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
          width="100%"
        />
      </div>
    </div>
  );
}
