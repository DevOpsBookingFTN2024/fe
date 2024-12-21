import { Grid } from "@mui/material";

// components
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AccountForms from "./AccountForms";
import { useMemo } from "react";

const AccountSettingsPage = () => {
  const BCrumb = useMemo(
    () => [
      {
        to: "/",
        title: "Home",
      },
      {
        title: "Account settings",
      },
    ],
    []
  );

  return (
    <PageContainer
      title={"Account settings"}
      description="this is Account Setting page"
    >
      {/* breadcrumb */}
      <Breadcrumb title={"Account settings"} items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AccountForms />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AccountSettingsPage;
