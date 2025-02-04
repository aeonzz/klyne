import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
