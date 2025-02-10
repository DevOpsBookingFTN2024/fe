import { USER_KEY } from "@api/auth";
import {
  changePassword,
  deleteAccount,
  getCurrentUser,
  InputUser,
  PasswordUpdateRequest,
  updateUser,
  User,
} from "@api/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { useQuery } from "@tanstack/react-query";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@ui/forms/theme-elements/CustomTextField";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import BlankCard from "@ui/shared/BlankCard";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import accountSchema from "./accountSchema";
import UserNotificationsForm from "./NotificationsForm";
import passwordSchema from "./passwordSchema";

const AccountForms = () => {
  const { user, setUser, deleteUser } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getCurrentUser(),
  });

  useEffect(() => {
    setUser({ ...user, ...data } as User);
  }, [data]);

  const [userDetails, setUserDetails] = useState<InputUser>();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<InputUser>({
    resolver: zodResolver(accountSchema),
  });

  const {
    handleSubmit: handleSubmitPasswordForm,
    reset: resetPasswordForm,
    control: controlPasswordForm,
    formState: { errors: errorsPasswordForm, isValid: isValidPasswordForm },
  } = useForm<PasswordUpdateRequest>({
    resolver: zodResolver(passwordSchema),
  });

  const handleCancelUserProfileUpdate = () => {
    reset(user);
  };

  const handleCancelPasswordUpdate = () => {
    resetPasswordForm();
  };

  const handleDeleteUser = () => {
    {
      deleteUser();
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(USER_KEY);
      navigate("/");
    }
  };

  const userProfileMutation = useNotifiedMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      const newUser = { ...user, ...userDetails } as User;

      setUser(newUser);
    },
    showSuccessNotification: true,
  });

  const passwordMutation = useNotifiedMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      resetPasswordForm();
    },
    showSuccessNotification: true,
  });

  const deleteProfileMutation = useNotifiedMutation({
    mutationFn: deleteAccount,
    onSuccess: handleDeleteUser,
    showSuccessNotification: true,
  });

  const submitUpdateUser = (newItem: InputUser) => {
    if (isValid) {
      setUserDetails(newItem);
      userProfileMutation.mutate(newItem);
    }
  };

  const submitUpdatePassword = (newItem: PasswordUpdateRequest) => {
    if (isValidPasswordForm) {
      passwordMutation.mutate(newItem);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={3}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Change password
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Change current password
            </Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 4,
                }}
                htmlFor="currentPassword"
              >
                Current password
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="oldPassword"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.oldPassword !== undefined}
                    helperText={errorsPasswordForm.oldPassword?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="oldPassword"
                    {...field}
                  />
                )}
              />

              {/* 2 */}
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="newPassword"
              >
                New password
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="newPassword"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.newPassword !== undefined}
                    helperText={errorsPasswordForm.newPassword?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="newPassword"
                    {...field}
                  />
                )}
              />
              {/* 3 */}
              <CustomFormLabel
                sx={{
                  mt: 2,
                }}
                htmlFor="confirmPassword"
              >
                Confirm password
              </CustomFormLabel>
              <Controller
                control={controlPasswordForm}
                name="repeatNewPassword"
                defaultValue=""
                render={({ field }) => (
                  <CustomTextField
                    error={errorsPasswordForm.repeatNewPassword !== undefined}
                    helperText={errorsPasswordForm.repeatNewPassword?.message}
                    required
                    fullWidth
                    variant="outlined"
                    type="password"
                    id="repeatNewPassword"
                    {...field}
                  />
                )}
              />
            </form>
          </CardContent>
        </BlankCard>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={2}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmitPasswordForm(submitUpdatePassword)}
          >
            Save
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelPasswordUpdate}
          >
            Cancel
          </Button>
        </Stack>
      </Grid>

      {/* Edit Details */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Personal details
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Update personal details
            </Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="firstName"
                  >
                    First name
                  </CustomFormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={user?.firstName ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="firstName"
                        required
                        disabled={userProfileMutation.isPending}
                        error={errors.firstName !== undefined}
                        helperText={errors.firstName?.message}
                        placeholder={"First name"}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="lastName"
                  >
                    Last name
                  </CustomFormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={user?.lastName ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        variant="outlined"
                        required
                        disabled={userProfileMutation.isPending}
                        error={errors.lastName !== undefined}
                        helperText={errors.lastName?.message}
                        placeholder={"Last name"}
                        id="lastName"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="emailAddress"
                  >
                    e-mail
                  </CustomFormLabel>
                  <Controller
                    name="emailAddress"
                    control={control}
                    defaultValue={user?.emailAddress ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="emailAddress"
                        required
                        disabled={userProfileMutation.isPending}
                        error={errors.emailAddress !== undefined}
                        helperText={errors.emailAddress?.message}
                        placeholder={"e-mail"}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="username"
                  >
                    Username
                  </CustomFormLabel>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue={user?.username ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="username"
                        required
                        disabled={userProfileMutation.isPending}
                        error={errors.username !== undefined}
                        helperText={errors.username?.message}
                        placeholder={"Username"}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="residence"
                  >
                    Residence
                  </CustomFormLabel>
                  <Controller
                    name="residence"
                    control={control}
                    defaultValue={user?.residence ?? undefined}
                    render={({ field }) => (
                      <CustomTextField
                        id="residence"
                        required
                        disabled={userProfileMutation.isPending}
                        error={errors.residence !== undefined}
                        helperText={errors.residence?.message}
                        placeholder={"Residence"}
                        variant="outlined"
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "end" }}
          mt={2}
        >
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit(submitUpdateUser)}
          >
            Save
          </Button>
          <Button
            size="large"
            variant="text"
            color="error"
            onClick={handleCancelUserProfileUpdate}
          >
            Cancel
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={3}>
        <UserNotificationsForm />
      </Grid>
      <Grid item xs={12}>
        <BlankCard>
          <CardContent sx={{ border: "1px solid #eb5252" }}>
            <Stack
              direction={"row"}
              sx={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box flex={1}>
                <Typography variant="h5" mb={1}>
                  Delete account
                </Typography>
                <Typography color="textSecondary" mb={3}>
                  Once you delete your account, there is no going back
                </Typography>
              </Box>
              <Button
                size="large"
                variant="text"
                color="error"
                onClick={() => deleteProfileMutation.mutate(undefined)}
              >
                Delete
              </Button>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default AccountForms;
