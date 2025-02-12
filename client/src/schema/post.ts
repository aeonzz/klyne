import * as z from "zod";

/**@
 *
 * @description schema for post schema
 */

export const createPost = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Atleast 1 character")
    .max(100, "Cannot exceed 100 characters"),
});

export type CreatePost = z.infer<typeof createPost>;
