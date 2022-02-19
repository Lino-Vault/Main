import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardContent, CardHeader, Grid, Stack, Typography, Divider } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//

import { BaseOptionChart } from '../../charts';

import USDCLino from '../../../usdcLinoFarm.png';
import { Image } from '@mui/icons-material';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380] }];

export default function YieldFarm() {

  return (
    <Card>
      <CardHeader title="Yield Farm" subheader="Earn Governance token and participate in the DAO" />
      <Grid container sx={{p: 3, pb: 2.5}}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <img src={USDCLino} width={100} height={70} color="inherit"/>
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
