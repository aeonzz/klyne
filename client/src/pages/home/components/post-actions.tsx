import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Loader2, Pen, Share, Trash } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { EditPost } from "@/schema/post";

interface PostActionsProps {
  postId: string;
  postContent: string;
  queryKey: string;
  isAuthor: boolean;
}

export default function PostActions({
  postId,
  postContent,
  queryKey,
  isAuthor,
}: PostActionsProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [dropdownOpen, setDropDownOpen] = React.useState(false);
  const [content, setContent] = React.useState(postContent);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const handleUpdate = async (deleted?: boolean | undefined) => {
    try {
      const payload: EditPost = {
        postId: postId,
        content,
        deleted,
      };
      await mutateAsync(payload);
      setOpen(false);
      setOpenAlert(false);
      setDropDownOpen(false);
    } catch (error) {
      console.log(error);
      setOpen(false);
      setOpenAlert(false);
      getErrorMessage(error);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropDownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 size-7"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="shadow-none"
            onCloseAutoFocus={(e) => e.preventDefault()}
            align="end"
          >
            {!isAuthor && (
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Pen />
                  Edit
                </DropdownMenuItem>
              </DialogTrigger>
            )}
            <DialogContent
              className="p-4"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Edit post</DialogTitle>
              </DialogHeader>
              <div>
                <Textarea
                  maxRows={10}
                  defaultValue={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write post"
                  className="resize-none !text-xl shadow-none"
                />
              </div>
              <DialogFooter>
                <Button
                  disabled={
                    postContent === content || isPending || content.length === 0
                  }
                  onClick={() => handleUpdate()}
                >
                  {isPending && <Loader2 className="animate-spin" />}
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Share />
              Share
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!isAuthor && (
              <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Trash />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the post.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      onClick={() => handleUpdate(true)}
                      disabled={isPending}
                    >
                      {isPending && <Loader2 className="animate-spin" />}
                      Continue
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </div>
  );
}
