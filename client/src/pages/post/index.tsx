import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, X } from "lucide-react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import PostCard from "../home/components/post-card";
import { useQuery } from "@tanstack/react-query";
import type { GetPost } from "@/types/post";
import { getPost } from "@/lib/api/post";
import { Params } from "@/types/params";
import PostInput from "../home/components/post-input";

export default function PostDetails() {
  const params = useParams<Params>();
  const [searchParams] = useSearchParams();
  const session = useLoaderData();
  const navigate = useNavigate();
  const { id } = params;

  const { data, isError, isLoading } = useQuery<GetPost>({
    queryKey: [params.id],
    queryFn: async () => await getPost({ postId: params.id }),
    enabled: !!id,
  });
  console.log(data);

  if (!id) {
    return (
      <div className="flex h-1/2 w-full flex-col items-center justify-center gap-4">
        <p>Post not found</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-1/2 w-full items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex h-1/2 w-full items-center justify-center">
        Error bugok
      </div>
    );
  }

  const isReplying = searchParams.get("r") === "true";

  return (
    <main className="h-auto">
      <Button
        variant="ghost"
        size="icon"
        className="m-3 [&_svg]:size-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        {isReplying ? <X /> : <ChevronLeft />}
      </Button>
      <PostCard
        post={data.data}
        index={0}
        queryKey={id}
        isReplying={isReplying}
      />
      <PostInput
        placeholder="Post your reply"
        session={session}
        queryKey={[id]}
        replyToUsername={data.data.user.name}
        replyToId={data.data.id}
        isReplying={isReplying}
      />
      {!isReplying && (
        <React.Fragment>
          {data.data.replies.map((reply, index) => (
            <PostCard
              key={reply.createdAt.toString()}
              post={reply}
              index={index}
              queryKey={id}
              isReplying={isReplying}
            />
          ))}
        </React.Fragment>
      )}
    </main>
  );
}
