import { USER_KEY } from "@api/auth";
import { User } from "@api/user/user";
import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import useAuthStore from "@stores/authStore";
import { useNotificationStore } from "@stores/notificationStore";
import PageContainer from "@ui/container/PageContainer";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .max(
      standardMaxLength,
      `Username must have at least ${standardMaxLength} characters`
    ),
  password: z.string({
    required_error: "Password is required",
  }),
});

type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  const loginUser = async (input: LoginInput) => {
    const baseUrl = new URL(
      "auth/login",
      new URL(import.meta.env.VITE_USER_API_URL, window.location.origin)
    );
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        // "Accept-language": i18n.language,
        "Content-type": "application/json",
      },
    });

    if (!result.ok) {
      setError("username", {
        message: "",
        type: "server",
      });
      setError("password", {
        message: "",
        type: "server",
      });
      openNotification({
        isError: true,
        primaryText: "An error occurred",
        secondaryText: await result.text(),
      });
      return;
    }

    const { token } = await result.json();

    const currentUserUrl = new URL(
      "users/me",
      new URL(import.meta.env.VITE_USER_API_URL, window.location.origin)
    );

    const currentUserResult = await fetch(currentUserUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!currentUserResult.ok) {
      throw new Error("Failed to fetch user information.");
    }

    const currentUserResponse = (await currentUserResult.json()) as User;

    // Save user data and navigate
    currentUserResponse.token = token;
    sessionStorage.setItem(USER_KEY, JSON.stringify(currentUserResponse));
    setUser(currentUserResponse);
    navigate("/");

    return;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageContainer description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
            >
              {/* <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box> */}
              <Box>
                <Box
                  component="form"
                  onSubmit={handleSubmit(loginUser)}
                  // sx={{ mt: 1 }}
                >
                  <Stack>
                    <Box>
                      <CustomFormLabel htmlFor="username">
                        {"Username"}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="username"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.username !== undefined}
                            helperText={errors.username?.message}
                            required
                            variant="outlined"
                            fullWidth
                            id="username"
                            autoComplete="username"
                            autoFocus
                            {...field}
                          />
                        )}
                      />
                    </Box>
                    <Box>
                      <CustomFormLabel htmlFor="password">
                        {"Password"}
                      </CustomFormLabel>
                      <Controller
                        control={control}
                        name="password"
                        defaultValue=""
                        render={({ field }) => (
                          <TextField
                            error={errors.password !== undefined}
                            helperText={errors.password?.message}
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            {...field}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                  </Stack>
                  <Box>
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      {"Login"}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
