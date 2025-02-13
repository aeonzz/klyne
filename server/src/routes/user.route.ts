import * as express from "express";
import { getUsers } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUsers);

export default userRouter;
