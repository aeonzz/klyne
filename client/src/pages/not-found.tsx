import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-2xl font-semibold tracking-tight">
      <h3 className="text-[162px] font-bold text-muted-foreground">404</h3>
      <span className="mt-16">Not Found</span>
      <Link
        to={"/"}
        className={cn(buttonVariants({ size: "lg", variant: "link" }))}
      >
        Home
      </Link>
    </div>
  );
}
