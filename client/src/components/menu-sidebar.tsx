import { menu } from "@/config/menu";
import { cn } from "@/lib/utils";
import { Component } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { buttonVariants } from "./ui/button";

export default function MenuSidebar() {
  return (
    <aside className="flex-1">
      <div className="ml-auto flex h-full w-1/2 flex-col">
        <div className="sticky top-0">
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
                    isActive ? "font-bold" : "font-normal"
                  )
                }
              >
                <item.icon className="!size-6" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
