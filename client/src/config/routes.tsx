import AuthLayout from "@/layouts/auth-layout";
import HomeLayout from "@/layouts/home-layout";
import ProtectedRoutes from "@/layouts/protected-routes";
import { getSession } from "@/lib/auth-client";
import About from "@/pages/about";
import SignIn from "@/pages/auth/signin";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <HomeLayout>
          <Home />
        </HomeLayout>
      </ProtectedRoutes>
    ),
    loader: async () => {
      const session = await getSession();
      return session
    },
    hydrateFallbackElement: <div />,
  },
  {
    path: "/about",
    element: (
      <ProtectedRoutes>
        <HomeLayout>
          <About />,
        </HomeLayout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/signin",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
