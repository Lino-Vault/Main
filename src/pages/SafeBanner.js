import {
    Card,
    Grid,
    Typography,
    Stack,
    Button,
    Tooltip,
  } from '@mui/material';

  import Logo from '../ckb.png';


  export default function SafeBanner() {
      return(
      <div>
          <Tooltip>
          <Card
          sx={{
              p: 2,
              m: 2,
              ':hover': {boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.4)' },
          }}
          >
              <Grid container alignItems="center">
                  <Grid item xs={5} sx={{ display: { xs: 'block', md: 'none'} }}>
                      <Typography variant="h6" color="text.secondary">
                          Asset
                      </Typography>
                  </Grid>
                  <Grid item xs={7} md={5} display="flex" justifyContent="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                          <img
                          src={Logo}
                          alt={'CKB Logo'}
                          width={35}
                          height={35}
                          color="inherit"
                          />
                          <Typography variant='subtitle1'>
                              CKB
                          </Typography>
                      </Stack>
                  </Grid>
                  <Grid item xs={6} sx={{ display: {xs: 'block', md: 'none'}}}>
                      <Typography variant='h6' color="text.secondary">
                          CKB Available
                      </Typography>
                  </Grid>
                  <Grid item xs={6} md={3} display="flex" justifyContent="center">
                      <Typography variant="subtitle1">
                          $12,3245.24
                      </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ display: {xs: 'block', md: 'none'}}}>
                      <Typography variant='h6' color="text.secondary">
                          Maximum LTV
                      </Typography>
                  </Grid>
                  <Grid item xs={6} md={2} display="flex" justifyContent="center">
                      <Typography variant="subtitle1">
                          88%
                      </Typography>
                  </Grid>
                  <Grid
                  item
                  xs={12}
                  md={2}
                  display="flex"
                  justifyContent="center"
                  sx={{ mt: { xs: 2, md: 0}}}
                  >
                      <Button variant="contained" size='medium' color='primary' >
                          Create
                      </Button>
                  </Grid>
              </Grid>
          </Card>
          </Tooltip>
      </div>
      );
  };