import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import type { Post } from "@/types/post";
import { cn } from "@/lib/utils";
import LikeButton from "./like-button";
import type { PayloadSession } from "@/types/auth-type";
import { useLoaderData, Link, useNavigate } from "react-router";
import EditPost from "./edit-post";

interface PostCardProps {
  post: Post;
  index: number;
  queryKey: string;
}

export default function PostCard({ post, index, queryKey }: PostCardProps) {
  const navigate = useNavigate();
  const session: PayloadSession = useLoaderData();
  const { id } = session.data.user;
  const isLiked = post.likes.find((like) => like.userId === id);
  return (
    <Card
      className={cn(
        "border-x-0 p-3 shadow-none hover:bg-muted/30 rounded-none",
        index !== 0 && "border-t-0"
      )}
    >
      <div className="flex">
        <Link to={`/p/${post.id}`} className="flex flex-grow gap-3">
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
        </Link>
        <EditPost
          postId={post.id}
          postContent={post.content}
          queryKey={queryKey}
        />
      </div>
      <CardContent className="pt-1">
        <h2
          className={cn(
            "font-medium break-all",
            post.content.length > 50 ? "text-md" : "text-4xl"
          )}
        >
          {post.content}
        </h2>
      </CardContent>
      <div className="z-50 flex w-full items-center gap-5 px-5">
        <LikeButton
          isLiked={!!isLiked}
          postId={post.id}
          userId={id}
          likes={post.likes}
          queryKey={queryKey}
        />
        <div className="flex items-center">
          <Button
            className="rounded-full hover:bg-blue-500/20 [&_svg]:size-5"
            variant="ghost"
            size="icon"
            onClick={() => {
              navigate(`/p/${post.id}`);
            }}
          >
            <MessageCircle className="mb-[2px] ml-[0.5px]" />
          </Button>
          <p className="cursor-pointer text-sm text-muted-foreground hover:underline">
            1
          </p>
        </div>
      </div>
    </Card>
  );
}
