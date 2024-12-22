import { Box, Button, IconButton, Stack, useMediaQuery } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import useAuthStore from "@stores/authStore";

const AppDD = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const { isValid } = useAuthStore();

  return (
    <>
      {!isValid && (
        <Stack
          direction={"row"}
          gap={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/notifications"
        component={Link}
      >
        {t("notification.title")}
      </Button> */}
          <Box>
            {lgUp ? (
              <Button
                color="inherit"
                variant="contained"
                sx={{ bgcolor: "primary.light" }}
                to="/login"
                component={Link}
                startIcon={<LoginIcon />}
              >
                Sign in
              </Button>
            ) : (
              <IconButton
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                to="/login"
                component={Link}
              >
                <LoginIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            {lgUp ? (
              <Button
                color="inherit"
                variant="contained"
                sx={{ bgcolor: "primary.light" }}
                to="/register"
                component={Link}
                startIcon={<HowToRegIcon />}
              >
                Sign up
              </Button>
            ) : (
              <IconButton
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                to="/register"
                component={Link}
              >
                <HowToRegIcon />
              </IconButton>
            )}
          </Box>
        </Stack>
      )}
    </>
  );
};

export default AppDD;
