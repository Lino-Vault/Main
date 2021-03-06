
import { Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import CKB from '../../../ckb.png';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function CKBVault() {

  return (
    <Card>
      <CardHeader title="CKB Vault" avatar={<img src={CKB} alt={'CKB Logo'} width={40} height={40} color="inherit"/>}/>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Stack alignItems="center">
              <Typography variant="h6">Collateral</Typography>
              <Typography variant='body2' color="primary.main">
                $11,234.23
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack alignItems="center">
              <Typography variant='h6'>Debt</Typography>
              <Typography variant='body2' color="error.light">
                $3,243.32
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
