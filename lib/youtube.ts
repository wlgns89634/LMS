import { Video, YouTubeSearchItem, YouTubeSearchResponse } from "@/types";
import axios from "axios";

const API_KEY = process.env.YOUTUBE_API_KEY;

export async function searchVideos(query: string): Promise<Video[]> {
  const res = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=12&key=${API_KEY}`,
  );

  const data: YouTubeSearchResponse = await res.data;

  return data.items.map((item: YouTubeSearchItem) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.medium.url,
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
  }));
}
