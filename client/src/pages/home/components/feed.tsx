import { getPosts } from "@/lib/api/post";
import { useQuery } from "@tanstack/react-query";
import { CircleAlert, Loader2 } from "lucide-react";
import PostCard from "./post-card";
import type { GetPosts } from "@/types/post";

export default function Feed() {
  const { data, isError, isLoading } = useQuery<GetPosts>({
    queryKey: ["get-posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen border-y w-full pt-40 justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-1/2 w-full items-center justify-center">
        Error bugok
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="flex h-1/2 w-full flex-col items-center justify-center gap-3">
        <CircleAlert className="size-9 text-muted-foreground" />
        <p className="text-sm font-medium tracking-tight text-muted-foreground">
          Wala pay mga post tangina mo
        </p>
      </div>
    );
  }

  return (
    <>
      {data.data.map((post, index) => (
        <PostCard key={index} post={post} index={index} queryKey="get-posts" />
      ))}
    </>
  );
}
