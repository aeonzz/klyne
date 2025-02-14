import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Loader2, Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "@/lib/api/post";
import { getErrorMessage } from "@/lib/get-error-message";

interface EditPostProps {
  postId: string;
  postContent: string;
  queryKey: string;
}

export default function EditPost({
  postId,
  postContent,
  queryKey,
}: EditPostProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [dropdownOpen, setDropDownOpen] = React.useState(false);
  const [content, setContent] = React.useState(postContent);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleUpdate = async () => {
    try {
      const payload = {
        postId: postId,
        content,
      };
      await mutateAsync(payload);
      setOpen(false);
      setDropDownOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
      getErrorMessage(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropDownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="shadow-none"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pen />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="p-4">
            <DialogHeader>
              <DialogTitle>Edit post</DialogTitle>
            </DialogHeader>
            <div>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write post"
                className="resize-none !text-xl shadow-none"
              />
            </div>
            <DialogFooter>
              <Button
                disabled={postContent === content || isPending}
                onClick={handleUpdate}
              >
                {isPending && <Loader2 className="animate-spin" />}
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
