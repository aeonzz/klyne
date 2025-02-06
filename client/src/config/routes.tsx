import About from "@/pages/about";
import SignIn from "@/pages/auth/signin";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
