import { Box, Container, styled, useTheme } from "@mui/material";
import useAuthStore from "@stores/authStore";
import ScrollToTop from "@ui/shared/ScrollToTop";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./vertical/header/Header";
import Sidebar from "./vertical/sidebar/Sidebar";

import { useCustomizerStore } from "@stores/customizerStore";
import { useNotificationStore } from "@stores/notificationStore";
import { useUserNotificationStore } from "@stores/userNotificationStore";
import Notification from "@ui/Notification";
import { useStomp } from "../../StompContext";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

const FullLayout: FC = () => {
  const { isOpen, data, closeNotification } = useNotificationStore();
  const { isCollapse, MiniSidebarWidth, isLayout } = useCustomizerStore();
  const theme = useTheme();
  const { subscribe } = useStomp();
  const { addData } = useUserNotificationStore();

  const { isValid, user } = useAuthStore((state) => state);

  // useEffect(() => {
  //   if (isOpen) {
  //     setTimeout(() => closeNotification(), 3000);
  //   }
  // }, [isOpen]);

  // if (!isValid) {
  //   return <Navigate to={"/login"} replace={true} />;
  // }

  useEffect(() => {
    const subscription = subscribe(
      `/topic/notifications/${user?.username}`,
      (message) => {
        console.log(message);
        addData(message);
      }
    ) as any;

    return () => subscription?.unsubscribe();
  }, [subscribe, user?.username]);

  return (
    <ScrollToTop>
      <MainWrapper>
        <Sidebar />
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse && {
              [theme.breakpoints.up("lg")]: {
                ml: `${MiniSidebarWidth}px`,
              },
            }),
          }}
        >
          <Header />
          <Container
            sx={{
              maxWidth: isLayout === "boxed" ? "lg" : "100%!important",
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
              <Outlet />
            </Box>

            <Notification
              isShowing={isOpen}
              primaryText={data.primaryText ?? "Notification"}
              secondaryText={data.secondaryText}
              isError={data.isError}
              closeNotification={closeNotification}
            />
          </Container>
        </PageWrapper>
      </MainWrapper>
    </ScrollToTop>
  );
};

export default FullLayout;
