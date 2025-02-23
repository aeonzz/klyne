import AuthLayout from "@/layouts/auth-layout";
import HomeLayout from "@/layouts/home-layout";
import ProtectedRoutes from "@/layouts/protected-routes";
import { getSession } from "@/lib/auth-client";
import SignIn from "@/pages/auth/signin";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import PostDetails from "@/pages/post";
import PostNav from "@/pages/post/_components/post-nav";
import { Loader2 } from "lucide-react";
import { createBrowserRouter, Outlet } from "react-router";

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
      console.log(session, "wtf");
      return session;
    },
    hydrateFallbackElement: (
      <div className="flex h-screen w-full justify-center pt-56">
        <Loader2 className="animate-spin text-primary" />
      </div>
    ),
  },
  {
    path: "/p",
    element: <Outlet />,
    children: [
      {
        path: ":id",
        element: (
          <ProtectedRoutes>
            <HomeLayout navBar={<PostNav />}>
              <PostDetails />
            </HomeLayout>
          </ProtectedRoutes>
        ),
        loader: async () => {
          const session = await getSession();
          return session;
        },
        hydrateFallbackElement: (
          <div className="flex h-screen w-full justify-center pt-56">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ),
      },
      {
        index: true,
        element: <NotFound />,
      },
    ],
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
