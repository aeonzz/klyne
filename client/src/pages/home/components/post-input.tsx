import FileUploader from "@/components/file-uploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { type ClientUploadedFileData } from "uploadthing/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useLocation, useNavigate } from "react-router";

interface PostInputProps {
  session: {
    data: Session;
  };
  placeholder?: string;
  replyToUsername?: string;
  replyToId?: string;
  queryKey: string[];
  isReplying?: boolean;
}

const MAX_CONTENT = 150;

export default function PostInput({
  session,
  replyToUsername,
  replyToId,
  queryKey,
  isReplying,
  placeholder = "Write something stupid...",
}: PostInputProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState<string>("");
  const { image, name, id } = session.data.user;
  const progressPercent = Math.min((content.length / MAX_CONTENT) * 100, 100);
  const isPostView = location.pathname.startsWith("/p");

  const { handleUpload, isUploading } = useUploadFile("imageUploader", {
    onError: () => {
      getErrorMessage("Something went wrong");
    },
  });

  async function onSubmit() {
    if (content.length > MAX_CONTENT || content === "") return;
    setIsLoading(true);
    try {
      let uploadResult: ClientUploadedFileData<unknown>[] = [];

      if (files.length > 0) {
        uploadResult = await handleUpload(files);
      }

      const payload: CreatePost = {
        userId: id,
        content,
        replyToId,
        imageUrl: uploadResult.map((url) => url.ufsUrl),
      };
      await createPost(payload);
      setContent("");
      setFiles([]);
      setIsLoading(false);
      if (isReplying) {
        navigate(`/p/${replyToId}`);
      }
      queryClient.invalidateQueries({ queryKey: queryKey });
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
          {replyToUsername && (
            <div className="flex items-center gap-1 px-3 text-xs font-light">
              <h4 className="text-muted-foreground">Replying to</h4>
              <p className="text-blue-500">@{replyToUsername}</p>
            </div>
          )}
          <Textarea
            value={content}
            maxRows={8}
            onClick={() => {
              if (isPostView) {
                navigate(`/p/${replyToId}?r=true`);
              }
            }}
            maxLength={MAX_CONTENT}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "min-h-[50px] resize-none border-none py-1 shadow-none focus-visible:ring-0",
              files.length > 0 ? "text-base" : "!text-xl placeholder:text-xl"
            )}
          />
          {files.length > 0 && (
            <ImagePreview
              file={files}
              onValueChange={setFiles}
              fileInputRef={fileInputRef}
              disabled={isLoading}
            />
          )}
          {isPostView && isReplying && (
            <div className="mt-2 flex items-center justify-between">
              <FileUploader
                value={files}
                // handleUpload={handleUpload}
                onValueChange={setFiles}
                disabled={isUploading}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
                maxFiles={4}
              />
              <div className="flex items-center gap-3">
                <CircularProgress
                  value={progressPercent}
                  thumbColor={
                    content.length === MAX_CONTENT
                      ? "text-destructive"
                      : undefined
                  }
                  className="size-6"
                />
                <Button
                  className="ml-auto w-fit text-white"
                  onClick={onSubmit}
                  disabled={!content || isLoading}
                  variant="accent"
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
