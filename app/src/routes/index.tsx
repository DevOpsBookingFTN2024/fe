import { createBrowserRouter } from "react-router-dom";
import React from "react";
import LayoutUnauth from "@layout/LayoutUnauth";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import AccountSettingsPage from "@pages/account-settings/AccountSettingsPage";
import AccommodationsPage from "@pages/acommodations/AccommodationsPage";

const FullLayout = React.lazy(() => import("@layout/full/FullLayout"));
const ErrorPage = React.lazy(() => import("@pages/Error/ErrorPage"));
const NotFoundPage = React.lazy(() => import("@pages/Error/NotFoundPage"));
const HomePage = React.lazy(() => import("@pages/home/HomePage"));

const browserConfig = createBrowserRouter([
  {
    id: "layout-auth",
    path: "/",
    element: <FullLayout />,
    children: [
      {
        id: "dashboard",
        path: "/",
        children: [
          {
            index: true,
            element: <HomePage />,
            errorElement: <ErrorPage />,
          },
        ],
      },

      {
        id: "user-profile",
        path: "/user-profile",
        element: <AccountSettingsPage />,
        errorElement: <ErrorPage />,
      },
      {
        id: "accommodations",
        path: "/accommodations",
        element: <AccommodationsPage />,
        errorElement: <ErrorPage />,
      },
      {
        id: "notFound",
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },

  {
    id: "layout-unatuh",
    element: <LayoutUnauth />,
    children: [
      {
        id: "login",
        path: "/login",
        element: <LoginPage />,
      },
      {
        id: "register",
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default browserConfig;
