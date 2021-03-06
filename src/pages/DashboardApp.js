// material
import { Box, Grid, Container } from '@mui/material';
// components
import Page from '../components/Page';
import {
  TotalCollateral,
  CirculatingLino,
  TotalDebt,
  Welcome,
  CKBVault,
  LinoVaultStatistics,
  YieldFarm
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

          <Grid item xs={12} md={6} lg={4}>
            <LinoVaultStatistics />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <CKBVault />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <YieldFarm />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
