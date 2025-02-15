"use client";

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
import { useNavigate } from "react-router";
import { Session } from "@/types/auth-type";

interface UserNavProps {
  session: Session;
}

export default function UserNav({ session }: UserNavProps) {
  const [isSignOut, setIsSignOut] = React.useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8 cursor-pointer">
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px] shadow-none">
        <DropdownMenuLabel className="flex flex-col">
          {session.user.name}
          <span className="text-xs text-muted-foreground">
            {session.user.email}
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
