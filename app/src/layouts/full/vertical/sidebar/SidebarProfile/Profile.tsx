import {
  Box,
  Avatar,
  Typography,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";

import ProfileImg from "/src/assets/images/profile/user-1.jpg";
import { useCustomizerStore } from "@stores/customizerStore";
import { USER_KEY } from "@api/auth";
import useAuthStore from "@stores/authStore";
import { IconPower } from "@tabler/icons-react";

export const Profile = () => {
  const { user, deleteUser } = useAuthStore((state) => state);
  const customizer = useCustomizerStore((state) => state);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";

  const handleLogout = () => {
    {
      deleteUser();
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
  };
  return (
    <Box
      display={"flex"}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${"secondary.light"}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar src={ProfileImg} alt={ProfileImg} />

          <Box>
            <Typography variant="h6" color={"white"}>
              {user?.username}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Tooltip title={"Logout"} placement="top">
              <IconButton
                color="primary"
                onClick={handleLogout}
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};
