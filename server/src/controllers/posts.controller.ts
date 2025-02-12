import type { Request, Response } from "express";
import { db } from "../lib/db";

const createPost = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    // const data = await db.user.findMany();
    res.status(200).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createPost };
