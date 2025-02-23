import { Loader2 } from "lucide-react";
import React from "react";

export default function RouteLoader() {
  return (
    <div className="flex h-screen w-full justify-center pt-56">
      <Loader2 className="animate-spin text-primary" />
    </div>
  );
}
