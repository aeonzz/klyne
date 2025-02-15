import LoginWrapper from "@/components/login-wrapper";
import { ModeToggle } from "@/components/mode-toggle";
import { Component } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <header>
      <nav className="flex items-center justify-between rounded-lg px-5 py-3">
        <Link to="/">
          <Component className="size-6" />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LoginWrapper />
        </div>
      </nav>
    </header>
  );
}
