import LayoutUnauth from "@layout/LayoutUnauth";
import AccommodationsPage from "@pages/accommodations/AccommodationsPage";
import AccommodationDetailsPage from "@pages/accommodations/details/AccommodationDetailsPage";
import AccountSettingsPage from "@pages/account-settings/AccountSettingsPage";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import AccommodationAvailabilityPage from "@pages/my-accommodations/availability/AccommodationAvailabilityPage";
import MyAccommodationsPage from "@pages/my-accommodations/MyAccommodationsPage";
import React from "react";
import { createBrowserRouter } from "react-router-dom";
// import AccommodationsPage from "@pages/acommodations/AccommodationsPage";

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
        id: "accommodations",
        path: "/",
        children: [
          {
            index: true,
            element: <AccommodationsPage />,
            errorElement: <ErrorPage />,
          },
          {
            id: "accommodation_details",
            path: ":accommodationId",
            children: [
              {
                index: true,
                element: <AccommodationDetailsPage />,
                errorElement: <ErrorPage />,
                // loader: productLoader,
              },
            ],
          },
          {
            id: "my-accommodations",
            path: "/my-accommodations",
            children: [
              {
                index: true,
                element: <MyAccommodationsPage />,
                errorElement: <ErrorPage />,
                // loader: () =>
                //   queryClient.fetchQuery({
                //     queryKey: ["facilities"],
                //     queryFn: () => getFacilities(),
                //   }),
              },

              {
                id: "accommodation",
                path: ":accommodationId",
                children: [
                  {
                    index: true,
                    element: <AccommodationAvailabilityPage />,
                    errorElement: <ErrorPage />,
                    // loader: productLoader,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "user-profile",
        path: "/user-profile",
        element: <AccountSettingsPage />,
        errorElement: <ErrorPage />,
      },
      // {
      //   id: "accommodations",
      //   path: "/accommodations",
      //   element: <AccommodationsPage />,
      //   errorElement: <ErrorPage />,
      // },
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
