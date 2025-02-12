import React from "react";

interface HomeLayoutProps {
  children?: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return <main className="h-auto flex justify-center p-8">{children}</main>;
}
