import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import type { Post } from "@/types/post";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";

interface PostCardProps {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: PostCardProps) {
  return (
    <Card
      className={cn("border-x-0 p-3 shadow-none", index !== 0 && "border-t-0")}
    >
      <div className="flex gap-3">
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={post.user.image ?? ""} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-medium text-sm tracking-tight">
            {post.user.name}
          </h3>
          <p className="text-xs font-light text-muted-foreground">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </p>
        </div>
      </div>
      <CardContent className="pt-1">
        <h2 className="text-4xl font-medium">{post.content}</h2>
      </CardContent>
      <div className="flex w-full items-center gap-5 px-5">
        <LikeButton likes={post.likes} postId={post.id} />
        <Button
          className="rounded-full hover:bg-blue-300/50 [&_svg]:size-6"
          variant="ghost"
          size="icon"
        >
          <MessageCircle className="mb-[2px] ml-[0.5px]" />
        </Button>
      </div>
    </Card>
  );
}
