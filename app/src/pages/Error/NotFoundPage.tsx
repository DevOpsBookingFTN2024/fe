import {Box, Button, Container, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
      >
        <Container maxWidth="md">
          <Grid container spacing={10}>
            <Grid xs={6} direction="column" spacing={4}>
              <Typography
                  variant="h1"
                  sx={{
                    font: "bold",
                    color: "GrayText",
                    fontSize: "4rem",
                  }}
              >
                {" "}
                {"Stranica nije pronađena."}{" "}
              </Typography>
              <Typography
                  variant="h6"
                  sx={{
                    color: "gray",
                  }}
              >
                {"Provjerite URL adresu i pokušajte ponovo."}
              </Typography>
              <Button
                  sx={{marginTop: 4}}
                  variant="contained"
                  onClick={() => navigate("/")}
              >
                {"Idi na početnu"}
              </Button>
            </Grid>
            <Grid xs={6}>
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt=""/>
            </Grid>
          </Grid>
        </Container>
      </Box>
  );
}
