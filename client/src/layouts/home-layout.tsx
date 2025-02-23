import MenuSidebar from "@/components/menu-sidebar";
import { Input } from "@/components/ui/input";
import NavBar from "@/pages/home/components/nav-bar";
import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
  navBar?: React.ReactNode;
}

export default function HomeLayout({
  children,
  navBar = <NavBar />,
}: HomeLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="flex h-full w-full flex-col items-center">
        <div className="flex w-full justify-center">
          <MenuSidebar />
          <div className="relative w-[39rem] border-x">
            {navBar}
            <div className="border-t">{children}</div>
          </div>
          <div className="basis-1/3 pl-7">
            <div className="mr-auto flex h-full w-[85%] flex-col">
              <div className="sticky top-0 flex h-screen flex-col justify-between pb-3">
                <Input
                  className="my-1.5 w-full rounded-full p-5"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
