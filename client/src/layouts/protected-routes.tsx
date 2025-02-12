import { useSession } from "@/lib/auth-client";
import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  if (session.isPending) return null;
  return session.data ? children : <Navigate to="/signin" />;
}
