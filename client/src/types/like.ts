import type { User } from "better-auth/types";
import type { Post } from "./post";

export type Like = {
  id: string;
  userId: string;
  user: User;
  postId: string;
  post: Post;
  createdAt: Date;
};
