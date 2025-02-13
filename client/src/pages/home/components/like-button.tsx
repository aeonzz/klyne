import React from "react";
import { Button } from "@/components/ui/button";
import type { Like } from "@/types/like";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/lib/api/post";
import { useLoaderData } from "react-router";
import type { PayloadSession } from "@/types/auth-type";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  likes: Like[];
  postId: string;
}

export default function LikeButton({ likes, postId }: LikeButtonProps) {
  const session: PayloadSession = useLoaderData();
  const { id } = session.data.user;
  const isLiked = likes.find((like) => like.userId === session.data.user.id);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  return (
    <div className="flex items-center">
      <Button
        className="rounded-full hover:bg-pink-300/50 [&_svg]:size-6"
        variant="ghost"
        size="icon"
        onClick={() => {
          mutate({
            postId,
            userId: id,
          });
        }}
        disabled={isLiked !== undefined}
      >
        <Heart className={cn("ml-[0.3px]", isLiked && "fill-pink")} />
      </Button>
      <p className="text-sm text-muted-foreground">{likes.length}</p>
    </div>
  );
}
