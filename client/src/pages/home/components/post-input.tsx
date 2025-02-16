import FileUploader from "@/components/file-uploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUploadFile } from "@/hooks/use-upload-file";
import { createPost } from "@/lib/api/post";
import { getErrorMessage } from "@/lib/get-error-message";
import { type CreatePost } from "@/schema/post";
import { Session } from "@/types/auth-type";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import ImagePreview from "./image-preview";

interface PostInputProps {
  session: {
    data: Session;
  };
}

export default function PostInput({ session }: PostInputProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState<string>("");
  const { image, name, id } = session.data.user;

  const { handleUpload, isUploading, uploadedFiles } = useUploadFile(
    "imageUploader",
    {
      onSuccess: () => {
        alert("Upload successful!");
        setFiles([]);
      },
      onError: () => alert("Upload failed!"),
    }
  );

  async function onSubmit() {
    setIsLoading(true);
    try {
      await handleUpload(files);
      console.log(uploadedFiles)
      const payload: CreatePost = {
        content: content,
        userId: id,
      };
      // await createPost(payload);
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
      <div className="flex p-3">
        <Avatar className="size-9">
          <AvatarImage src={image ?? undefined} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col">
          <Textarea
            value={content}
            maxRows={8}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your stupid post"
            className="min-h-[50px] resize-none border-none py-1 !text-2xl shadow-none placeholder:text-2xl focus-visible:ring-0"
          />
          {files.length > 0 && (
            <ImagePreview
              file={files}
              onValueChange={setFiles}
              fileInputRef={fileInputRef}
            />
          )}
          <Separator className="my-3" />
          <div className="flex items-center justify-between">
            <FileUploader
              value={files}
              // handleUpload={handleUpload}
              onValueChange={setFiles}
              disabled={isUploading}
              isUploading={isUploading}
              fileInputRef={fileInputRef}
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
      </div>
    </Card>
  );
}
