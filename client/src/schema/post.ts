import * as z from "zod";

export const createPost = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character")
    .max(60, "Maximum of 60 character"),
  userId: z.string({
    required_error: "User id is required",
  }),
  imageUrl: z.array(z.string()).optional(),
  replyToId: z.string().optional(),
  quoteOfId: z.string().optional(),
});

export const likePost = z.object({
  userId: z.string({
    required_error: "User id is require",
  }),
  postId: z.string({
    required_error: "Post id is required",
  }),
  state: z.boolean({
    required_error: "State is required",
  }),
});

export const editPost = z.object({
  postId: z.string({
    required_error: "Post id is required",
  }),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character")
    .max(100, "Maximum of 100 characters"),
  deleted: z.boolean().optional(),
});

export type CreatePost = z.infer<typeof createPost>;
export type LikePost = z.infer<typeof likePost>;
export type EditPost = z.infer<typeof editPost>;
