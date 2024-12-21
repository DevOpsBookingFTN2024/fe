import {
  IconButton,
  Box,
  Badge,
  Avatar,
  Button,
  Chip,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";
import { IconBellRinging } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@stores/authStore";
// import { getUnreadNotifications } from "@api/user/user";
import { useEffect, useState } from "react";
import Scrollbar from "@ui/custom-scroll/Scrollbar";

const Notifications = () => {
  const { user } = useAuthStore();

  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const { data, refetch } = useQuery({
    queryKey: ["unread_notifications", user?.id],
    // queryFn: () => getUnreadNotifications(user?.id ?? 0),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? "primary.main" : "text.secondary",
        }}
        // to="/notifications"
        // component={Link}
        onClick={handleClick2}
      >
        <Badge
          color="primary"
          // badgeContent={data?.notReadNotifications}
        >
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
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
          },
        }}
      >
        <Stack
          direction="row"
          py={2}
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Notifications</Typography>
          <Chip label="5 new" color="primary" size="small" />
        </Stack>
        <Scrollbar sx={{ height: "385px" }}>
          {data?.map((notification, index) => (
            <Box key={index}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}>
                  {/* <Avatar
                    src={notification.avatar}
                    alt={notification.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                    }}
                  /> */}
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: "240px",
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: "240px",
                      }}
                      noWrap
                    >
                      {notification.subtitle}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
        <Box p={3} pb={1}>
          <Button
            to="/notifications"
            variant="outlined"
            component={Link}
            color="primary"
            fullWidth
          >
            See all Notifications
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Notifications;
