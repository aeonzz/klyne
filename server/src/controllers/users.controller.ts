import type { Request, Response } from "express";
import { db } from "../lib/db";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const {} = req.body;
    const data = await db.user.findMany();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllUsers };
