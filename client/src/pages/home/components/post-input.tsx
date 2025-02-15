import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/api/post";
import { getErrorMessage } from "@/lib/get-error-message";
import { UploadButton } from "@/lib/uploadthing";
import { type CreatePost } from "@/schema/post";
import { Session } from "@/types/auth-type";
import { useQueryClient } from "@tanstack/react-query";
import { Image, Loader2 } from "lucide-react";
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
      <div className="flex flex-col items-start p-3">
        <div className="flex w-full items-start">
          <Avatar className="size-9">
            <AvatarImage src={image ?? undefined} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Textarea
            value={content}
            maxRows={8}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your stupid post"
            className="min-h-[50px] resize-none border-none py-1 !text-2xl shadow-none placeholder:text-2xl focus-visible:ring-0"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <UploadButton
            content={{
              button({ ready }) {
                if (ready) return <Image className="size-5" />;
                return "Getting ready...";
              },
            }}
            className="ut-button:bg-transparent ut-button:size-10 ut-button:text-blue-500 ut-allowed-content:hidden ut-button:ut-readying:bg-red-500/50 ut-button:rounded-full cursor-pointer rounded-full hover:bg-accent"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Uploaded files:", res);
              alert("Upload complete!");
            }}
            onUploadError={(error) => {
              console.error("Upload error:", error);
              alert(`Upload failed! ${error.message}`);
            }}
            onUploadProgress={(gg) => {
              console.log(gg)
            }}
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
