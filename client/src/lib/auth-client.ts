import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `http://localhost:${import.meta.env.VITE_API_PORT}`,
});

export const { signIn, useSession, signUp } = authClient;
