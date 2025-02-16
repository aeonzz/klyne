import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import React from "react";
import { Loader2, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";
import { useLoaderData, useNavigate } from "react-router";
import { PayloadSession } from "@/types/auth-type";

export default function UserNav() {
  const [isSignOut, setIsSignOut] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const session: PayloadSession = useLoaderData();

  const { data } = session;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={data.user.image ?? ""} />
          <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] shadow-none">
        <DropdownMenuLabel className="flex flex-col">
          {data.user.name}
          <span className="text-xs text-muted-foreground">
            {data.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
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
          {isSignOut ? <Loader2 className="animate-spin" /> : <LogOut />}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
