import * as z from "zod";

export const createPost = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character")
    .max(100, "Cannot exceed 100 characters"),
  userId: z.string({
    required_error: "User id is required",
  }),
});

export const likePost = z.object({
  userId: z.string({
    required_error: "User id is require",
  }),
  postId: z.string({
    required_error: "Post id is required",
  }),
});

export type CreatePost = z.infer<typeof createPost>;
export type LikePost = z.infer<typeof likePost>;
