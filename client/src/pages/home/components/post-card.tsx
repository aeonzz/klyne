import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Button } from "@/components/ui/button";
import { Bookmark, MessageCircle, Repeat2, Share } from "lucide-react";
import type { Post } from "@/types/post";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import type { PayloadSession } from "@/types/auth-type";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import PostActions from "./post-actions";
import { Separator } from "@/components/ui/separator";

interface PostCardProps {
  post: Post;
  index: number;
  queryKey: string;
  isLastPost?: boolean;
  isParentPost?: boolean;
}

export default function PostCard({
  post,
  index,
  queryKey,
  isLastPost,
  isParentPost = false,
}: PostCardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const session: PayloadSession = useLoaderData();
  const { id } = session.data.user;
  const isLiked = post.likes.find((like) => like.userId === id);
  const isPostView = location.pathname.startsWith("/p") && isParentPost;
  const isAuthor = id === post.id;

  return (
    <Card
      className={cn(
        "relative flex gap-3 overflow-hidden rounded-none border-x-0 p-3 shadow-none",
        index !== 0 ? "border-b-0" : "border-y-0",
        isLastPost && "mb-5",
        !isPostView && "cursor-pointer hover:bg-muted/20"
      )}
      onClick={() => {
        if (!isPostView) {
          navigate(`/p/${post.id}`);
        }
      }}
    >
      {!isPostView && (
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={post.user.image ?? ""} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className="w-full space-y-2">
        <div className="flex items-start">
          <div
            className={cn(
              "flex flex-grow gap-2",
              isPostView ? "items-start" : "items-center"
            )}
          >
            {isPostView && (
              <Avatar className="size-8 cursor-pointer">
                <AvatarImage src={post.user.image ?? ""} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <h3 className="text-medium text-sm tracking-tight">
              {post.user.name}
            </h3>
            {!isPostView && (
              <React.Fragment>
                <div className="size-1 rounded-full bg-muted-foreground" />
                <p className="text-xs font-light text-muted-foreground">
                  {formatDistanceToNowStrict(post.createdAt)}
                </p>
              </React.Fragment>
            )}
          </div>
          <PostActions
            postId={post.id}
            postContent={post.content}
            queryKey={queryKey}
            isAuthor={isAuthor}
          />
        </div>
        <CardContent
          className={cn(
            "flex flex-col gap-3 p-0 pr-2",
            post.imageUrl && "pb-1"
          )}
        >
          <h2 className="break-all text-base font-normal">{post.content}</h2>
          {post.imageUrl.length > 0 && (
            <div
              className={cn(
                "grid h-[512px] grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-lg",
                post.imageUrl.length === 1 && "grid-cols-1 grid-rows-1",
                post.imageUrl.length === 2 &&
                  "h-[256px] grid-cols-2 grid-rows-1"
              )}
            >
              {post.imageUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  loading="lazy"
                  decoding="async"
                  alt={`${url}${index}`}
                  className={cn(
                    "aspect-square h-full w-full object-cover transition-all hover:brightness-75",
                    post.imageUrl.length === 3 && index === 2 && "col-span-2"
                  )}
                />
              ))}
            </div>
          )}
        </CardContent>
        {isPostView && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-sm font-light text-muted-foreground">
              <p>{format(post.createdAt, "p")}</p>
              <div className="size-[2px] rounded-full bg-muted-foreground" />
              <p>{format(post.createdAt, "PP")}</p>
            </div>
            <Separator />
          </div>
        )}
        <div className="z-50 grid w-full grid-cols-5 pr-2">
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="group peer rounded-full hover:bg-blue-500/20 [&_svg]:size-5"
              variant="ghost"
              size="icon"
              onClick={() => {
                navigate(`/p/${post.id}`);
              }}
            >
              <MessageCircle className="mb-[2px] ml-[0.5px] text-muted-foreground group-hover:stroke-blue-500" />
            </Button>
            <p className="cursor-pointer text-sm text-muted-foreground peer-hover:text-blue-500">
              {post.replies.length}
            </p>
          </div>
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="group peer rounded-full hover:bg-green-500/20 [&_svg]:size-5"
              variant="ghost"
              size="icon"
              onClick={() => {
                navigate(`/p/${post.id}?r=true`);
              }}
            >
              <Repeat2 className="mb-[2px] ml-[0.5px] text-muted-foreground group-hover:stroke-green-500" />
            </Button>
            <p className="cursor-pointer text-sm text-muted-foreground peer-hover:text-green-500"></p>
          </div>
          <LikeButton
            isLiked={!!isLiked}
            postId={post.id}
            userId={id}
            likes={post.likes}
            queryKey={queryKey}
          />
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="group peer rounded-full hover:bg-blue-500/20 [&_svg]:size-5"
              variant="ghost"
              size="icon"
            >
              <Bookmark className="mb-[2px] ml-[0.5px] text-muted-foreground group-hover:stroke-blue-500" />
            </Button>
            <p className="cursor-pointer text-sm text-muted-foreground peer-hover:text-blue-500"></p>
          </div>
          <div className="ml-auto">
            <div
              className="group flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                className="rounded-full hover:bg-blue-500/20 [&_svg]:size-5"
                variant="ghost"
                size="icon"
              >
                <Share className="mb-[2px] ml-[0.5px] text-muted-foreground group-hover:stroke-blue-500" />
              </Button>
            </div>
          </div>
        </div>
        {isPostView && <Separator />}
      </div>
    </Card>
  );
}
