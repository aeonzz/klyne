import { Button } from "@/components/ui/button";
import TopBarLayout from "@/layouts/top-bar-layout";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function PostNav() {
  const navigate = useNavigate();
  return (
    <TopBarLayout>
      <div className="flex h-full w-full items-center space-x-3 px-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeft />
        </Button>
        <p className="text-lg font-semibold">Post</p>
      </div>
    </TopBarLayout>
  );
}
