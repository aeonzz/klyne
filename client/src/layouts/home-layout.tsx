import NavBar from "@/pages/home/components/nav-bar";
import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main>
      <div className="flex h-auto min-h-screen w-full flex-col items-center pt-16">
        <NavBar />
        <div className="w-full max-w-screen-sm border-x">{children}</div>
      </div>
    </main>
  );
}
