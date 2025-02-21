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
import NumberFlow from "@number-flow/react";

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

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: boolean
  ) => {
    e.stopPropagation();
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
    <div
      className="group flex items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        className="group rounded-full hover:bg-pink-500/20 [&_svg]:size-5"
        variant="ghost"
        size="icon"
        onClick={(e) => {
          handleLike(e, isLiked ? false : true);
        }}
        disabled={isPending}
      >
        <Heart
          className={cn(
            "ml-[0.25px] text-muted-foreground group-hover:stroke-pink-500",
            isLiked && "fill-pink-500 stroke-pink-500"
          )}
        />
      </Button>
      <HoverCard>
        <HoverCardTrigger asChild>
          <NumberFlow
            className="cursor-pointer text-sm text-muted-foreground hover:underline group-hover:text-pink-500"
            value={likes.length}
            format={{ useGrouping: false }}
            aria-hidden
          />
        </HoverCardTrigger>
        <HoverCardContent className="p-2 shadow-none">
          {likes.length === 0 ? (
            <div className="p-3 text-center text-sm font-medium tracking-tight">
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
