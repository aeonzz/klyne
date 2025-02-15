import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "@/lib/api/post";
import { cn } from "@/lib/utils";
import { getErrorMessage } from "@/lib/get-error-message";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { Like } from "@/types/like";
import UserLikeCard from "./user-liked-card";

interface LikeButtonProps {
  isLiked: boolean;
  postId: string;
  userId: string;
  queryKey: string;
  likes: Like[];
}

export default function LikeButton({
  isLiked,
  postId,
  userId,
  queryKey,
  likes,
}: LikeButtonProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleLike = async (value: boolean) => {
    try {
      await mutateAsync({
        postId,
        userId: userId,
        state: value,
      });
    } catch (error) {
      console.log(error);
      getErrorMessage(error);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        className="group rounded-full hover:bg-red-500/50 [&_svg]:size-6"
        variant="ghost"
        size="icon"
        onClick={() => {
          handleLike(isLiked ? false : true);
        }}
        disabled={isPending}
      >
        <Heart
          className={cn(
            "ml-[0.25px] group-hover:stroke-red-500",
            isLiked && "fill-red-500 stroke-red-500"
          )}
        />
      </Button>
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className="text-sm text-muted-foreground cursor-pointer hover:underline">{likes.length}</p>
        </HoverCardTrigger>
        <HoverCardContent className="shadow-none p-2">
          {likes.length === 0 ? (
            <div className="p-3 text-sm font-medium tracking-tight text-center">
              No likes at the moment
            </div>
          ) : (
            <React.Fragment>
              {likes.map((like, index) => (
                <UserLikeCard key={index} like={like} />
              ))}
            </React.Fragment>
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
