import * as express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controller";
import authorize from "../middlewares/auth-middleware";
import { validateData } from "../middlewares/validation-middleware";
import {
  createPostSchema,
  deletePostSchema,
  likePostSchema,
  updatePostSchema,
} from "../schemas/post.schema";

const postRouter = express.Router();

postRouter.post("/", authorize, validateData(createPostSchema), createPost);

postRouter.get("/", authorize, getPosts);

postRouter.post("/like", authorize, validateData(likePostSchema), likePost);

postRouter.get("/:id", authorize, getPost);

postRouter.patch("/:id", authorize, validateData(updatePostSchema), updatePost);

postRouter.delete(
  "/:id",
  authorize,
  validateData(deletePostSchema),
  deletePost
);

export default postRouter;
