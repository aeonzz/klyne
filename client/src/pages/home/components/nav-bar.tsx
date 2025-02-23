import { Button } from "@/components/ui/button";
import TopBarLayout from "@/layouts/top-bar-layout";

export default function NavBar() {
  return (
    <TopBarLayout>
      <div className="flex h-full w-full items-center">
        <Button
          variant="ghost"
          className="h-full grow rounded-none p-0 hover:bg-accent/30"
        >
          <span className="relative inline-flex h-full items-center overflow-hidden before:absolute before:bottom-0 before:h-1 before:w-full before:rounded-full before:bg-primary">
            For you
          </span>
        </Button>
        <Button
          variant="ghost"
          className="h-full grow rounded-none p-0 hover:bg-accent/30"
        >
          Following
        </Button>
      </div>
    </TopBarLayout>
  );
}
