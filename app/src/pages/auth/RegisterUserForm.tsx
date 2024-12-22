import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNotificationStore } from "@stores/notificationStore";
import CustomFormLabel from "@ui/forms/theme-elements/CustomFormLabel";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(5, {
      message: "Username must be atl least 5 characters long",
    })
    .max(standardMaxLength, {
      message: `Username must not exceed ${standardMaxLength} characters.`,
    }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters long.",
    })
    .max(standardMaxLength, {
      message: `Password must not exceed ${standardMaxLength} characters.`,
    }),
  emailAddress: z
    .string()
    .email({
      message: "Invalid email format.",
    })
    .optional()
    .or(z.literal(""))
    .transform((d) => (d === "" ? undefined : d)),
  firstName: z
    .string({
      required_error: "First name is required.",
    })
    .min(1, {
      message: "First name must be at least 3 characters long.",
    })
    .max(standardMaxLength, {
      message: `First name must not exceed ${standardMaxLength} characters.`,
    }),
  lastName: z
    .string({
      required_error: "Last name is required.",
    })
    .min(1, {
      message: "Last name must be at least 3 characters long.",
    })
    .max(standardMaxLength, {
      message: `Last name must not exceed ${standardMaxLength} characters.`,
    }),
  residence: z
    .string({
      required_error: "Residence is required.",
    })
    .max(standardMaxLength, {
      message: `Residence must not exceed ${standardMaxLength} characters.`,
    }),
  role: z.array(z.string()).nonempty("At least one role must be selected."),
});

type RegisterInput = z.infer<typeof registerSchema>;

interface RegisterUserProps {
  role: string;
  setIsSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterUserForm = ({ role, setIsSuccessful }: RegisterUserProps) => {
  const [loading, setLoading] = useState(false);

  const openNotification = useNotificationStore(
    (state) => state.openNotification
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const registerUser = async (input: RegisterInput) => {
    setLoading(true);
    const baseUrl = new URL("auth/register", import.meta.env.VITE_USER_API_URL);
    const result = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    });

    setLoading(false);
    if (!result.ok) {
      openNotification({
        isError: true,
        primaryText: "Error happened",
        secondaryText: (await result.json()).message,
      });
      return;
    }

    setIsSuccessful(true);
    return;
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit(registerUser)}>
        <input
          type="hidden"
          {...register("role", {
            required: false,
            value: [role],
          })}
        />
        <Grid container direction={"row"} spacing={1}>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="firstName">First name</CustomFormLabel>
            <Controller
              control={control}
              name="firstName"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.firstName !== undefined}
                  helperText={errors.firstName?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="name"
                  autoFocus
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="lastName">Last name</CustomFormLabel>
            <Controller
              control={control}
              name="lastName"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.lastName !== undefined}
                  helperText={errors.lastName?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="surname"
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12} lg={12}>
            <CustomFormLabel htmlFor="emailAddress">E-mail</CustomFormLabel>
            <Controller
              control={control}
              name="emailAddress"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ marginTop: "0px" }}
                  error={errors.emailAddress !== undefined}
                  helperText={errors.emailAddress?.message}
                  variant="outlined"
                  fullWidth
                  id="email"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={12}>
            <CustomFormLabel htmlFor="residence">Residence</CustomFormLabel>
            <Controller
              control={control}
              name="residence"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={errors.residence !== undefined}
                  helperText={errors.residence?.message}
                  required
                  variant="outlined"
                  fullWidth
                  id="residence"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
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
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ marginTop: "0px" }}
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
          </Grid>
        </Grid>

        <LoadingButton
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          loading={loading}
          sx={{ marginTop: "20px" }}
        >
          Register
        </LoadingButton>
      </Box>
      <Stack direction="row" spacing={1} mt={2} justifyContent="center">
        <Typography variant="h6" fontWeight="300">
          Already have an account?
        </Typography>
        <Typography
          component={Link}
          to="/login"
          fontWeight="500"
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "#3A75FC",
          }}
        >
          Login
        </Typography>
      </Stack>
    </>
  );
};

export default RegisterUserForm;
