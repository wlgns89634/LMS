import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProgress, getProgress } from "@/lib/progress";

export function useProgress(videoId: string) {
  const queryClient = useQueryClient();

  const { data: progress } = useQuery({
    queryKey: ["progress", videoId],
    queryFn: () => getProgress(videoId),
  });

  const { mutate: updateProgress } = useMutation({
    mutationFn: ({ videoId, percent }: { videoId: string; percent: number }) =>
      saveProgress(videoId, percent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", videoId] });
    },
  });

  return { progress, updateProgress };
}
