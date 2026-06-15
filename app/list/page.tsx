import { searchVideos } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";

export default async function List() {
  const videos = await searchVideos("Next.js 강의");
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">강의 목록</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}
