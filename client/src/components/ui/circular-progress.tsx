"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

interface CircularProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  thumbColor?: string;
}

const CircularProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CircularProgressProps
>(({ className, value, thumbColor = "text-primary", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-24 w-24", className)}
    {...props}
  >
    <svg className="h-full w-full" viewBox="0 0 100 100">
      <circle
        className="text-primary/20"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
      <circle
        className={cn(thumbColor)}
        strokeWidth="10"
        strokeDasharray={283}
        strokeDashoffset={283 - ((value || 0) / 100) * 283}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
    </svg>
  </ProgressPrimitive.Root>
));
CircularProgress.displayName = ProgressPrimitive.Root.displayName;

export { CircularProgress };
