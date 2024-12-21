import { useState } from "react";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";

import { IconMail } from "@tabler/icons-react";

import ProfileImg from "/src/assets/images/user-1.jpg";
import { USER_KEY } from "@api/auth";
import useAuthStore from "@stores/authStore";
import accountIcon from "/src/assets/images/svgs/icon-account.svg";
import { Link } from "react-router-dom";

interface ProfileType {
  href: string;
  title: string;
  subtitle: string;
  icon: any;
}
const profileDropdownData: ProfileType[] = [
  {
    href: "/user-profile",
    title: "My Profile",
    subtitle: "Account settings",
    icon: accountIcon,
  },
];

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { user, deleteUser } = useAuthStore();

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    {
      deleteUser();
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show_notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 4,
          },
        }}
      >
        <Typography variant="h5">{"User profile"}</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={ProfileImg}
            alt={user?.firstName}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user?.username}
            </Typography>
            <Tooltip title={user?.emailAddress} enterDelay={500}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                display="flex"
                alignItems="center"
                gap={1}
                style={{ wordWrap: "break-word" }}
              >
                <IconMail />
                {user?.emailAddress}
              </Typography>
            </Tooltip>
          </Box>
        </Stack>
        <Divider />
        {profileDropdownData.map((profile) => (
          <Box key={profile.title}>
            <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
              <Link to={profile.href}>
                <Stack direction="row" spacing={2}>
                  <Box
                    width="45px"
                    height="45px"
                    bgcolor="primary.light"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      src={profile.icon}
                      alt={profile.icon}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      color="textPrimary"
                      className="text-hover"
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {profile.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {profile.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </Link>
            </Box>
          </Box>
        ))}
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            fullWidth
          >
            {"Logout"}
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
