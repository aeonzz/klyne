import express, { Express, Request, Response } from "express";
import { db } from "./lib/db";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get("/api/hello", async (req: Request, res: Response) => {
  const data = await db.user.findMany();
  res.json(data);
});

app.listen(port, () => {
  console.log("wtf");
});
