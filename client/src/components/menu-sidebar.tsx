import { menu } from "@/config/menu";
import { cn } from "@/lib/utils";
import { Component } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { buttonVariants } from "./ui/button";
import UserNav from "./user-nav";

export default function MenuSidebar() {
  return (
    <aside className="basis-[24%] pr-2.5">
      <div className="ml-auto flex h-full w-[16rem] flex-col">
        <div className="sticky top-0 flex h-screen flex-col justify-between pb-3">
          <div>
            <div className="flex h-14 w-full items-center py-3">
              <Component className="ml-5 size-7" />
            </div>
            <nav className="flex flex-col items-start gap-1">
              {menu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "!rounded-full !p-6 !text-lg [&_svg]:mr-1.5",
                      buttonVariants({ variant: "ghost", size: "default" }),
                      isActive ? "font-bold" : "font-medium"
                    )
                  }
                >
                  <item.icon className="!size-6" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <UserNav />
        </div>
      </div>
    </aside>
  );
}
