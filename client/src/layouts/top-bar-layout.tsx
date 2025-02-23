import React from "react";

interface TopBarLayoutProps {
  children?: React.ReactNode;
}

export default function TopBarLayout({ children }: TopBarLayoutProps) {
  return (
    <header className="sticky top-0 z-50 overflow-hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="flex h-14 items-center justify-between rounded-lg">
        {children}
      </nav>
    </header>
  );
}
