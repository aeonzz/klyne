import React from "react";
import { useLoaderData } from "react-router";
import Feed from "./components/feed";
import PostInput from "./components/post-input";

export default function Home() {
  const session = useLoaderData();

  return (
    <React.Fragment>
      <PostInput session={session} queryKey={["get-posts"]} />
      <Feed />
    </React.Fragment>
  );
}
