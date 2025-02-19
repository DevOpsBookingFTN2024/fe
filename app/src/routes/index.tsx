/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import queryClient from "../query-client";
import { getFacilities } from "@api/accommodations/accommodations";
import useAuthStore from "@stores/authStore";

const FullLayout = React.lazy(() => import("@layout/full/FullLayout"));
const LayoutUnauth = React.lazy(() => import("@layout/LayoutUnauth"));
const ErrorPage = React.lazy(() => import("@pages/Error/ErrorPage"));
const NotFoundPage = React.lazy(() => import("@pages/Error/NotFoundPage"));
const AccommodationsPage = React.lazy(
  () => import("@pages/accommodations/AccommodationsPage")
);
const AccommodationDetailsPage = React.lazy(
  () => import("@pages/accommodations/details/AccommodationDetailsPage")
);
const MyAccommodationsPage = React.lazy(
  () => import("@pages/my-accommodations/MyAccommodationsPage")
);
const AccommodationAvailabilityPage = React.lazy(
  () =>
    import(
      "@pages/my-accommodations/availability/AccommodationAvailabilityPage"
    )
);
const ReservationsPage = React.lazy(
  () => import("@pages/reservations/ReservationsPage")
);
const AccountSettingsPage = React.lazy(
  () => import("@pages/account-settings/AccountSettingsPage")
);
const UserNotificationsPage = React.lazy(
  () => import("@pages/notifications/UserNotificationsPage")
);
const LoginPage = React.lazy(() => import("@pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("@pages/auth/RegisterPage"));
const UnauthorizedPage = React.lazy(
  () => import("@pages/auth/UnauthorizedPage")
);

// ProtectedRoute component
const ProtectedRoute = ({ requiredRole }: any) => {
  const { isValid, user } = useAuthStore();

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles.includes(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const browserConfig = createBrowserRouter([
  {
    id: "layout-auth",
    path: "/",
    element: <FullLayout />,
    errorElement: <ErrorPage />,
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
            element: <AccommodationDetailsPage />,
            errorElement: <ErrorPage />,
          },
          {
            id: "my-accommodations",
            path: "/my-accommodations",
            element: <ProtectedRoute requiredRole="ROLE_HOST" />,
            children: [
              {
                index: true,
                element: <MyAccommodationsPage />,
                loader: () =>
                  queryClient.fetchQuery({
                    queryKey: ["facilities"],
                    queryFn: () => getFacilities(),
                  }),
              },
              {
                id: "accommodation",
                path: ":accommodationId",
                children: [
                  {
                    index: true,
                    element: <AccommodationAvailabilityPage />,
                    errorElement: <ErrorPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "reservations",
        path: "/reservations",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <ReservationsPage />,
          },
        ],
      },
      {
        id: "user-profile",
        path: "/user-profile",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <AccountSettingsPage />,
          },
        ],
      },
      {
        id: "notifications",
        path: "/notifications",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <UserNotificationsPage />,
          },
        ],
      },
      {
        id: "not-found",
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    id: "layout-unatuh",
    element: <LayoutUnauth />,
    errorElement: <ErrorPage />,
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
  {
    id: "unauthorized",
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);

export default browserConfig;