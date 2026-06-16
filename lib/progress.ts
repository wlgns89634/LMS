import { supabase } from "./supabese";
import { Progress } from "@/types";

// 진도율 저장 (없으면 insert, 있으면 update)
export async function saveProgress(videoId: string, percent: number) {
  // 현재 저장된 진도율 먼저 조회
  const { data: existing } = await supabase
    .from("progress")
    .select("percent")
    .eq("video_id", videoId)
    .single();

  // 기존 진도율보다 낮으면 저장 안 함
  if (existing && existing.percent >= percent) return;

  const completed = percent >= 80;

  const { data, error } = await supabase
    .from("progress")
    .upsert(
      { video_id: videoId, percent, completed },
      { onConflict: "video_id" },
    );

  if (error) console.error(error);
  return data;
}

// 특정 영상 진도율 불러오기
export async function getProgress(videoId: string): Promise<Progress | null> {
  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("video_id", videoId)
    .maybeSingle();

  if (error) return null;
  return data;
}

// 전체 진도율 불러오기
export async function getAllProgress(): Promise<Progress[]> {
  const { data, error } = await supabase.from("progress").select("*");

  if (error) return [];
  return data;
}
