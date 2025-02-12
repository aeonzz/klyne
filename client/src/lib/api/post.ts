import type { CreatePost } from "@/schema/post";
import axios from "axios";

async function createPost(payload: CreatePost) {
  const response = await axios.post(
    `http://localhost:${process.env.VITE_API_PORT}}/api/v1/posts/create`,
    payload
  );
  return response.data;
}

export { createPost };
