import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import PostCard from "../home/components/post-card";
import { useQuery } from "@tanstack/react-query";
import type { GetPost } from "@/types/post";
import { getPost } from "@/lib/api/post";
import { Params } from "@/types/params";

export default function PostDetails() {
  const params = useParams<Params>();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery<GetPost>({
    queryKey: ["get-post-by-id", params],
    queryFn: async () => {
      const data = await getPost({ postId: params.id });
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-1/2 w-full items-center justify-center">
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

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="m-3 [&_svg]:size-7"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft />
      </Button>
      <PostCard post={data.data} index={0} queryKey="get-post-by-id" />
    </div>
  );
}
