import NavBar from "@/pages/home/components/nav-bar";
import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="flex h-auto justify-center">
      <div className="h-auto min-h-screen w-full max-w-screen-sm border">
        <NavBar />
        <div className="border-t" />
        <div className="h-[calc(100vh_-_60px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
