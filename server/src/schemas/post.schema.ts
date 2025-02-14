import * as z from "zod";

export const createPostSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character"),
  userId: z.string({
    required_error: "User id is required",
  }),
});

export const likePostSchema = z.object({
  userId: z.string({
    required_error: "User id is required",
  }),
  postId: z.string({
    required_error: "Post id is required",
  }),
  state: z.boolean({
    required_error: "State is required",
  }),
});

export const updatePostSchema = z.object({
  postId: z.string({
    required_error: "Post id is required",
  }),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character"),
});

export type LikePostSchema = z.infer<typeof likePostSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
