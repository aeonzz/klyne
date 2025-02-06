import * as express from "express";
import { getAllUsers } from "../controllers/users.controller";

const router = express.Router();

router.route("/all").get(getAllUsers);

export default router;
