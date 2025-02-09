import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
} from "@mui/material";

import { IconMenu2 } from "@tabler/icons-react";
import Profile from "./Profile";
import { useCustomizerStore } from "@stores/customizerStore";
import Navigation from "./Navigation";
import UserNotifications from "./UserNotifications";
import useAuthStore from "@stores/authStore";

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { isValid } = useAuthStore();

  // drawer
  const customizer = useCustomizerStore();
  // const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? () => customizer.toggleSidebar()
              : () => customizer.toggleMobileSidebar()
          }
        >
          <IconMenu2 size="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Navigation />
          <UserNotifications />
          {isValid && <Profile />}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
