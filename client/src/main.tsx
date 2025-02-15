import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./config/routes";
import { Toaster } from "./components/ui/sonner";
import QueryProvider from "./components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster richColors />
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>
);
