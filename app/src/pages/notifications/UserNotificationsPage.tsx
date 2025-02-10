import {
  getNotifications,
  notificationTypeMapping,
  UserNotification,
} from "@api/user/notifications";
import { mockNotifications } from "@layout/full/vertical/header/UserNotifications";
import {
  Box,
  Card,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const UserNotificationsPage = () => {
  const { user } = useAuthStore();

  const { data, refetch } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => getNotifications(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const renderItem = (notification: UserNotification) => {
    const typeInfo = notificationTypeMapping[notification.type] || {
      label: notification.type.replace("_", " "),
      color: "default" as const,
    };

    return (
      <Grid
        item
        xs={12}
        lg={12}
        md={12}
        sm={12}
        display="flex"
        alignItems="stretch"
        key={notification.id}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 3,
            borderRadius: 2,
            paddingBottom: "0px",
          }}
        >
          <Box key={notification.id}>
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
                    {dayjs(notification.dateTime).format("MMM D, YYYY • HH:mm")}
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
                    display: "-webkit-box",

                    whiteSpace: "normal",
                  }}
                >
                  {notification.message}
                </Typography>
              </Stack>
            </MenuItem>
          </Box>
        </Card>
      </Grid>
    );
  };

  const renderEmptyList = () => (
    <Grid item xs={12} lg={12} md={12} sm={12}>
      <Box textAlign="center" mt={6}>
        <Typography variant="h2">No notifications</Typography>
        <Typography variant="h6" mb={3}>
          No notifications found.
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {data?.length && data.length > 0 ? (
          data.map((notification) => renderItem(notification))
        ) : (
          <>{renderEmptyList()}</>
        )}
      </Grid>
    </Box>
  );
};

export default UserNotificationsPage;
