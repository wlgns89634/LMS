import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { YouTubeSearchResponse } from "@/types";

export function useVideos(query: string) {
  return useQuery({
    queryKey: ["videos", query],
    queryFn: async () => {
      const { data } = await axios.get<YouTubeSearchResponse>(
        `/api/videos?q=${query}`,
      );
      return data;
    },
  });
}
