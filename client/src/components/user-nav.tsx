import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import React from "react";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";
import { useLoaderData, useNavigate } from "react-router";
import { PayloadSession } from "@/types/auth-type";
import { Button } from "./ui/button";

export default function UserNav() {
  const [isSignOut, setIsSignOut] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const session: PayloadSession = useLoaderData();

  const { data } = session;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full py-6">
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={data.user.image ?? ""} />
            <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex basis-full flex-col items-start">
            <span className="text-sm font-bold">{data.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {data.user.email}
            </span>
          </div>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="w-[18rem] min-w-[200px] shadow-none"
      >
        <DropdownMenuItem className="p-2">Profile</DropdownMenuItem>
        <DropdownMenuItem
          className="p-2"
          onSelect={async (e) => {
            e.preventDefault();
            setIsSignOut(true);
            await signOut({
              fetchOptions: {
                onSuccess() {
                  navigate(0);
                },
                onError(ctx) {
                  setIsSignOut(false);
                  toast.error(ctx.error.message);
                },
              },
            });
          }}
          disabled={isSignOut}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
