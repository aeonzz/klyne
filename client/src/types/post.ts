import type { User } from "better-auth/types";
import type { Like } from "./like";

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  likes: Like[];
};

export type GetPosts = {
  message: string;
  data: Post[];
  error: string | null;
};

export type GetPost = {
  message: string;
  data: Post;
  error: string | null;
};
