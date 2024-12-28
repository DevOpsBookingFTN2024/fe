import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const PREFIX = "Demo";

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
  avatar: `${PREFIX}-avatar`,
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(
  () => ({
    [`&.${classes.header}`]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
      paddingLeft: "20px",
    },
    [`& .${classes.avatar}`]: {
      // marginRight: "10px",
    },
  })
);

const StyledAppointmentTooltipCommandButton = styled(
  AppointmentTooltip.CommandButton
)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: "center",
  },
}));

const StyledEmail = styled(EmailOutlinedIcon)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

export const Header = ({ children, appointmentData, ...restProps }) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    appointmentData={appointmentData}
    className={classes.header}
  >
    <Avatar src={appointmentData.imageUrl} className={classes.avatar} />
    <Typography variant="body1">{appointmentData.userFullName}</Typography>
    {children}
  </StyledAppointmentTooltipHeader>
);

export const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledEmail className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.userEmail}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

export const CommandButton = ({ ...restProps }) => (
  <StyledAppointmentTooltipCommandButton
    {...restProps}
    className={classes.commandButton}
  />
);
