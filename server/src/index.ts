import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { rateLimit } from "express-rate-limit";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./lib/uploadthing";

dotenv.config();

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(
  cors({
    origin: process.env.APP_URL, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// app.use(limiter);

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use(
  "/api/v1/uploadthing",
  createRouteHandler({
    router: uploadRouter,
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working");
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});

export default app