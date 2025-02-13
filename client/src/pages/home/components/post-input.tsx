import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/api/post";
import { getErrorMessage } from "@/lib/get-error-message";
import { type CreatePost } from "@/schema/post";
import { Session } from "@/types/auth-type";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface PostInputProps {
  session: {
    data: Session;
  };
}

export default function PostInput({ session }: PostInputProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState<string>("");
  const { image, name, id } = session.data.user;

  async function onSubmit() {
    setIsLoading(true);
    try {
      const payload: CreatePost = {
        content: content,
        userId: id,
      };
      await createPost(payload);
      setContent("");
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
      toast("Posted");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      getErrorMessage(error);
    }
  }

  return (
    <Card className="border-none shadow-none">
      <div className="flex items-start gap-3 p-3">
        <Avatar className="size-7">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-3 border p-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your stupid post"
            className="resize-none border-none p-0 shadow-none focus-visible:ring-0 placeholder:text-2xl !text-2xl"
          />
          <Button
            className="ml-auto w-fit"
            onClick={onSubmit}
            disabled={!content || isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
}
