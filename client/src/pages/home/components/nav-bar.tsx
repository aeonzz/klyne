import LoginWrapper from "@/components/login-wrapper";
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
        <LoginWrapper />
      </nav>
    </header>
  );
}
