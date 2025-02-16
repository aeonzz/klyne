import NavBar from "@/pages/home/components/nav-bar";
import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen w-full flex-col items-center pt-16">
        <NavBar />
        <div className="w-full max-w-screen-sm flex-1 border-x">{children}</div>
      </div>
    </main>
  );
}
