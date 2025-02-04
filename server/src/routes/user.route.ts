import { getAllUsers } from "../controllers/users.controller";
import express from "express";

const router = express.Router();

router.route("/all").get(getAllUsers);

export default router;
