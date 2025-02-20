import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
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

  const { data, isError, isLoading } = useQuery<GetPost>({
    queryKey: [params.id],
    queryFn: async () => await getPost({ postId: params.id }),
  });

  if (isLoading) {
    return (
      <div className="flex h-1/2 w-full items-center justify-center">
        <Loader2 className="animate-spin" />
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

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="m-3 [&_svg]:size-7"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ChevronLeft />
      </Button>
      <PostCard
        post={data.data}
        index={0}
        queryKey={params.id!}
        isReplying={searchParams.get("r") === "true"}
      />
      {searchParams.get("r") === "true" && (
        <PostInput placeholder="Post your reply" session={session} replyToUsername={data.data.user.name} />
      )}
    </div>
  );
}
