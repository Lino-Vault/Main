import { Card, CardHeader, Grid, Typography, Divider } from '@mui/material';


import USDCLino from '../../../usdcLinoFarm.png';

// ----------------------------------------------------------------------

export default function YieldFarm() {

  return (
    <Card>
      <CardHeader title="Yield Farm" subheader="Earn Governance token and participate in the DAO" />
      <Grid container sx={{p: 3, pb: 2.5}}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img src={USDCLino} alt={'2 Logos'} width={100} height={70} color="inherit"/>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center" mt={1}>
          <Typography variant="h5">USDC - LINO</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          sx={{ my: 1 }}
        >
          <Divider variant="middle" flexItem sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-start">
          <Typography variant='h6' sx={{ color: 'text.secondary'}}>
            APR
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Typography variant='h6'>
            94.23%
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-start">
          <Typography variant='h6' sx={{color: 'text.secondary'}}>
            TVL
          </Typography>
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <Typography variant="h6">
            $23,213.34
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
