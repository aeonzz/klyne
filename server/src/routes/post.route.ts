import * as express from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import authorize from "../middlewares/auth-middleware";
import { validateData } from "../middlewares/validation-middleware";
import { createPostSchema } from "../schemas/post.schema";

const postRouter = express.Router();

postRouter.post("/", authorize, validateData(createPostSchema), createPost);
postRouter.get("/", authorize, getPosts);
postRouter.get("/like", authorize, getPosts);

export default postRouter;
