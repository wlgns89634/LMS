export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

export interface Progress {
  id?: number;
  video_id: string;
  percent: number;
  completed: boolean;
  created_at?: string;
}

// YouTube API 응답 타입
export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeSnippet {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnails: {
    default: YouTubeThumbnail;
    medium: YouTubeThumbnail;
    high: YouTubeThumbnail;
  };
}

export interface YouTubeSearchItem {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: YouTubeSnippet;
}

export interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}
