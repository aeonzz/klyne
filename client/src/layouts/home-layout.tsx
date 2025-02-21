import MenuSidebar from "@/components/menu-sidebar";
import NavBar from "@/pages/home/components/nav-bar";
import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="flex h-screen w-full flex-col items-center">
        <div className="flex w-full">
          <MenuSidebar />
          <div className="flex-1 border-x border-t">
            <NavBar />
            <div className="border-t">{children}</div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </main>
  );
}
