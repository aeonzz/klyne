import type { CreatePost, EditPost, LikePost } from "@/schema/post";
import axios from "axios";

export async function createPost(payload: CreatePost) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/posts`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getPosts() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/posts`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function likePost(payload: LikePost) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/v1/posts/like`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function getPost({ postId }: { postId: string | undefined }) {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/v1/posts/${postId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function editPost(payload: EditPost) {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/v1/posts/${payload.postId}`,
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
