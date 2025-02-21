import { ModeToggle } from "@/components/mode-toggle";
import UserNav from "@/components/user-nav";
import { Component } from "lucide-react";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex items-center justify-between rounded-lg px-5 h-14">
        <Link to="/">
          <Component className="size-6" />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
