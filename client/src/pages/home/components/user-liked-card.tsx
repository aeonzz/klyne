import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Like } from "@/types/like";

interface UserLIkeCardProps {
  like: Like;
}

export default function UserLikeCard({ like }: UserLIkeCardProps) {
  return (
    <div className="p-1 flex items-center gap-2">
      <Avatar className="size-5 cursor-pointer">
        <AvatarImage src={like.user.image ?? ""} />
        <AvatarFallback>{like.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="text-sm ">{like.user.name}</p>
    </div>
  );
}
