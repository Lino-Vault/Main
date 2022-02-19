import { Icon } from '@iconify/react';
// material
import { Grid, Container, Stack, Typography, CardHeader, Card, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Image } from '@mui/icons-material';
// components
import Page from '../components/Page';

import { Box } from '@mui/system';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import USDCLino from '../usdcLinoFarm.png';

// ----------------------------------------------------------------------

export default function Farming() {
  return (
    <Page title="Yield Farming | Lino Vault">
      <Container maxWidth="md">
        <Card sx={{mb: 3, height: 100, position: 'relative'}}>
          <CardHeader
            title={'Yield Farming'}
            subheader={'Stake your tokens and earn rewards!'}
            action={
              <Box
                maxWidth="sm"
                sx={{
                  pt: 2,
                  pb: 2,
                  borderRadius: 1,
                  bgcolor: 'warning.light',
                }}
                >
                  <Typography
                    variant='h6'
                    textAlign="center"
                    color="grey.600"
                    sx={{mx: 2}}
                    >
                      Note: There is a Deposit fee of 0.75%.
                  </Typography>
                </Box>
            }
            />
        </Card>
        <Card sx={{ my: 2, background: `linear-gradient(135deg, rgb(40, 118, 201) 0%, rgb(104, 159, 217) 10%, rgb(210, 251, 250) 100%)`}}>
          <Accordion sx={{ background: `linear-gradient(135deg, rgb(40, 118, 201) 0%, rgb(104, 159, 217) 10%, rgb(210, 251, 250) 100%)`}} expanded>
            <AccordionSummary expandIcon={
              <Icon icon={arrowIosDownwardFill}
                  width={20}
                  height={20}
                  color="grey.700"
                  />
            }
            sx={{borderColor: 'grey.700'}}
            >
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6} md={3} display="flex" justifyContent={'flex-start'}>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <img src={USDCLino} width={60} height={44} color="grey.700"/>
                    <Stack alignItems={'flex-start'}>
                      <Typography sx={{color: 'grey.800'}} variant="h6">
                        USDC-LINO
                      </Typography>
                      <Typography sx={{color: 'grey.700'}} variant="caption">
                        Asset
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item alignItems="center" xs={6} md={3} display="flex" justifyContent="center">
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Image
                      src={USDCLino}
                      width={44}
                      height={44}
                      color="grey.700"
                      />
                      <Stack alignItems="center">
                        <Typography sx={{ color: "grey.800"}} variant="h6">
                          Governance Token
                        </Typography>
                        <Typography sx={{ color: 'grey.700'}} variant="caption">
                          Reward
                        </Typography>
                      </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={4} md={2} display="flex" justifyContent="center">
                  <Stack alignItems="center">
                    <Typography sx={{ color: 'grey.800'}} variant="h6">
                      $0.00
                    </Typography>
                    <Typography sx={{color: 'grey.700'}} variant="caption">
                      Deposited
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4} md={2} display="flex" justifyContent="center">
                  <Stack alignItems="center">
                    <Typography sx={{color: 'grey.800'}} variant="h6">
                      $43,243.56
                    </Typography>
                    <Typography sx={{color: 'grey.700'}} variant="caption">
                      TVL
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4} md={2} display="flex" justifyContent="center">
                  <Stack alignItems="center">
                    <Typography sx={{color: 'grey.700'}} variant="h6">
                      6%
                    </Typography>
                    <Typography sx={{color: 'grey.700'}} variant="caption">
                      APR
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </AccordionSummary>

          </Accordion>
        </Card>
      </Container>
    </Page>
  );
}
