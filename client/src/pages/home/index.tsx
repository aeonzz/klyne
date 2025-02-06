import React from "react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";

const numbers = [1, 2, 3, 4, 6, 10, 20, 40];

export default function Home() {
  const [number, setNumber] = React.useState<number | null>(null);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
      {number !== null ? (
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-5xl font-semibold tracking-tight">Your number is </h1>
          <span className="text-8xl font-bold">{number}</span>
          <Confetti className="w-full" />
        </div>
      ) : (
        <React.Fragment>
          <h1 className="font-old text-6xl tracking-tight">Let me read your mind</h1>
          <p className="">Pick a number</p>
          <div className="flex gap-3 text-xl font-medium">
            {numbers.map((number) => (
              <Button
                size="icon"
                variant="outline"
                onClick={() => setNumber(number)}
              >
                {number}
              </Button>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
