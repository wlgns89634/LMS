"use client";

import { Video } from "@/types";
import Image from "next/image";

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition">
      <Image
        src={video.thumbnail}
        alt={video.title}
        width={320}
        height={180}
        className="w-full"
      />
      <div className="p-4">
        <h2 className="font-semibold text-sm line-clamp-2">{video.title}</h2>
        <p className="text-gray-500 text-xs mt-1">{video.channelTitle}</p>
      </div>
    </div>
  );
}
