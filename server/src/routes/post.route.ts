import * as express from "express";
import { createPost } from "../controllers/posts.controller";

const router = express.Router();

router.route("/create").post(createPost);

export default router;
