import { notificationTypeMapping } from "@api/user/notifications";
import {
  Badge,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useUserNotificationStore } from "@stores/userNotificationStore";
import { IconBellRinging } from "@tabler/icons-react";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";


const UserNotifications = () => {
  const { data: notifications, clearData } = useUserNotificationStore();

  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    clearData();
    setAnchorEl2(null);
  };

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
        onClick={handleClick2}
      >
        <Badge color="primary">
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
          <Chip
            label={`${notifications?.length || 0} new`}
            color="primary"
            size="small"
          />
        </Stack>

        <Scrollbar sx={{ height: "385px" }}>
          {notifications?.map((notification, index) => {
            const typeInfo = notificationTypeMapping[notification.type] || {
              label: notification.type.replace("_", " "), // Fallback label
              color: "default" as const, // Default color if type is not mapped
            };

            return (
              <Box key={index}>
                <MenuItem sx={{ py: 2, px: 2 }}>
                  <Stack
                    width={"100%"}
                    direction="column"
                    spacing={0.5}
                    alignItems="flex-start"
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width={"100%"}
                    >
                      {/* Notification Date */}
                      <Typography
                        color="textSecondary"
                        variant="caption"
                        display="block"
                        sx={{ mt: 0.5 }}
                      >
                        {dayjs(notification.dateTime).format(
                          "MMM D, YYYY • HH:mm"
                        )}
                      </Typography>

                      {/* Notification Type as Chip */}
                      <Chip
                        label={typeInfo.label}
                        color={typeInfo.color}
                        size="small"
                      />
                    </Stack>

                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      sx={{
                        width: "340px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                      }}
                    >
                      {notification.message}
                    </Typography>
                  </Stack>
                </MenuItem>
              </Box>
            );
          })}
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

export default UserNotifications;
