import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/api/post";
import { type CreatePost } from "@/schema/post";
import { Session } from "@/types/auth-type";
import { Loader2 } from "lucide-react";
import React from "react";

interface PostInputProps {
  session: {
    data: Session;
  };
}

export default function PostInput({ session }: PostInputProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState<string>("");
  const { image, name } = session.data.user;

  async function onSubmit() {
    setIsLoading(true);
    const payload: CreatePost = {
      content: content,
    };
    const data = createPost(payload);
    return data;
  }

  return (
    <Card className="border-none shadow-none">
      <div className="flex items-start gap-3 p-3">
        <Avatar className="size-7">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-3 border p-3 shadow-sm">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your stupid post"
            className="resize-none border-none p-0 shadow-none focus-visible:ring-0"
          />
          <Button
            className="ml-auto w-fit"
            size="sm"
            onClick={onSubmit}
            disabled={!content}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
}
