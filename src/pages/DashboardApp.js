// material
import { Box, Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  TotalCollateral,
  CirculatingLino,
  TotalDebt,
  AppNewsUpdate,
  Welcome,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Lino Vault">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
        </Box>
        <Grid container spacing={5} >
          <Grid item xs={12} sm={12} md={12}>
            <Welcome />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TotalCollateral />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TotalDebt />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CirculatingLino />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
