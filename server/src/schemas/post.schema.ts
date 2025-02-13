import * as z from "zod";

export const createPostSchema = z.object({
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

export type CreatePostSchema = z.infer<typeof createPostSchema>;
