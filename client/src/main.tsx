import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./config/routes";
import { Toaster } from "./components/ui/sonner";
import QueryProvider from "./components/query-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </QueryProvider>
  </StrictMode>
);
