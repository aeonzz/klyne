import React from "react";
import UserNav from "./nav-bar";
import { useSession } from "@/lib/auth-client";

export default function LoginWrapper() {
  const session = useSession();
  if (session.isPending) return null;
  if (session.error) return <div>error</div>;
  if (!session.data) return <div>Theres no data</div>;
  return <UserNav session={session.data} />;
}
