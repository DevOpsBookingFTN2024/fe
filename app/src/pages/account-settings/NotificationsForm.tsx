import {
  getNotificationSettingsGuest,
  getNotificationSettingsHost,
  InputNotificationGuest,
  InputNotificationHost,
  updateNotificationSettingsGuest,
  updateNotificationSettingsHost,
} from "@api/user/notifications";
import {
  Button,
  CardContent,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import BlankCard from "@ui/shared/BlankCard";
import { Controller, useForm } from "react-hook-form";
import queryClient, { invalidateAllQueries } from "../../query-client";

export default function UserNotificationsForm() {
  const { isGuest, user } = useAuthStore();

  const { data, refetch } = useQuery({
    queryKey: ["notifications_settings", user?.id],
    queryFn: () =>
      isGuest ? getNotificationSettingsGuest() : getNotificationSettingsHost(),
  });

  const {
    handleSubmit: handleSubmitHost,
    reset: resetHost,
    control: controlHost,
  } = useForm<InputNotificationHost>({});

  const {
    handleSubmit: handleSubmitGuest,
    reset: resetGuest,
    control: controlGuest,
  } = useForm<InputNotificationGuest>({});

  const handleResetSettings = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isGuest
      ? resetGuest(data as InputNotificationGuest)
      : resetHost(data as InputNotificationHost);
  };

  const updateNotificationsMutation = useNotifiedMutation({
    mutationFn: isGuest
      ? updateNotificationSettingsGuest
      : updateNotificationSettingsHost,
    onSuccess: () => {
      invalidateAllQueries(queryClient, "notifications_settings");
    },
    showSuccessNotification: true,
  });

  const submitNotificationsSettings = (newItem: any) => {
    updateNotificationsMutation.mutate(newItem);
  };

  return (
    <>
      <BlankCard>
        <CardHeader title={"Notifications"} />
        <CardContent>
          {!isGuest ? (
            <Stack>
              <Controller
                name="isReservationRequestEnabled"
                control={controlHost}
                defaultValue={data?.isReservationRequestEnabled ?? false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Reservation created"
                  />
                )}
              />
              <Controller
                name="isReservationCanceledEnabled"
                control={controlHost}
                defaultValue={data?.isReservationCanceledEnabled ?? false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Reservation cancelled"
                  />
                )}
              />
              <Controller
                name="isHostRatedEnabled"
                control={controlHost}
                defaultValue={data?.isHostRatedEnabled ?? false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Host rated"
                  />
                )}
              />
              <Controller
                name="isAccommodationRatedEnabled"
                control={controlHost}
                defaultValue={data?.isAccommodationRatedEnabled ?? false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={value}
                        onChange={onChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Accommodation rated"
                  />
                )}
              />
            </Stack>
          ) : (
            <Controller
              name="isReservationResponseEnabled"
              control={controlGuest}
              defaultValue={data?.isReservationResponseEnabled ?? false}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={value}
                      onChange={onChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Reservation response"
                />
              )}
            />
          )}
        </CardContent>
      </BlankCard>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }} mt={2}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={
            isGuest
              ? handleSubmitGuest(submitNotificationsSettings)
              : handleSubmitHost(submitNotificationsSettings)
          }
        >
          Save
        </Button>
        <Button
          size="large"
          variant="text"
          color="error"
          onClick={handleResetSettings}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
