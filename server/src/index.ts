import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.APP_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
