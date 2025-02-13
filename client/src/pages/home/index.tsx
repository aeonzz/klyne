import React from "react";
import NavBar from "./components/nav-bar";
import { useLoaderData } from "react-router";
import PostInput from "./components/post-input";
import Feed from "./components/feed";

export default function Home() {
  const session = useLoaderData();

  return (
    <div className="h-auto min-h-screen w-full max-w-screen-sm border">
      <NavBar />
      <div className="border-t" />
      <div className="h-[calc(100vh_-_60px)] overflow-y-auto">
        <PostInput session={session} />
        <Feed />
      </div>
    </div>
  );
}
