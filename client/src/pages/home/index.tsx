import React from "react";
import NavBar from "./components/nav-bar";
import { useLoaderData } from "react-router";
import PostInput from "./components/post-input";

export default function Home() {
  const session = useLoaderData();
  return (
    // <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
    //   {number !== null ? (
    //     <div className="flex flex-col items-center gap-10">
    //       <h1 className="text-5xl font-semibold tracking-tight">Your number is </h1>
    //       <span className="text-8xl font-bold">{number}</span>
    //       <Confetti className="w-full" />
    //     </div>
    //   ) : (
    //     <React.Fragment>
    //       <h1 className="font-old text-6xl tracking-tight">Let me read your mind</h1>
    //       <p className="">Pick a number</p>
    //       <div className="flex gap-3 text-xl font-medium">
    //         {numbers.map((number) => (
    //           <Button
    //             size="icon"
    //             variant="outline"
    //             onClick={() => setNumber(number)}
    //           >
    //             {number}
    //           </Button>
    //         ))}
    //       </div>
    //     </React.Fragment>
    //   )}
    // </div>
    <div className="h-auto min-h-screen w-full max-w-screen-sm border ">
      <NavBar />
      <div className="border-t" />
      <div className="h-[calc(100vh_-_60px)] overflow-y-auto">
        <PostInput session={session} />
      </div>
    </div>
  );
}
