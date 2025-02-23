import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import PostCard from "../home/components/post-card";
import { useQuery } from "@tanstack/react-query";
import type { GetPost } from "@/types/post";
import { getPost } from "@/lib/api/post";
import { Params } from "@/types/params";
import PostInput from "../home/components/post-input";

export default function PostDetails() {
  const params = useParams<Params>();
  const session = useLoaderData();
  const navigate = useNavigate();
  const { id } = params;

  const { data, isError, isLoading } = useQuery<GetPost>({
    queryKey: [params.id],
    queryFn: async () => await getPost({ postId: params.id }),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center pt-40">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!id || !data?.data) {
    return (
      <div className="flex h-screen w-full flex-col justify-center gap-2 pt-40">
        <p className="text-sm text-muted-foreground">Post is not available.</p>
        <Button onClick={() => navigate(-1)}>Go back</Button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen w-full justify-center pt-40">
        <p className="text-sm text-muted-foreground">
          Something went wrong. Try again later
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-[170vh]">
      <PostCard post={data.data} index={0} queryKey={id} isParentPost />
      <PostInput
        placeholder="Post your reply"
        session={session}
        queryKey={[id]}
        replyToUsername={data.data.user.name}
        replyToId={data.data.id}
      />
      <React.Fragment>
        {data.data.replies.map((reply, index) => (
          <PostCard
            key={reply.createdAt.toString()}
            post={reply}
            index={index}
            queryKey={id}
            isLastPost={index === data.data.replies.length - 1}
          />
        ))}
      </React.Fragment>
    </main>
  );
}
