import {
    Card,
    Grid,
    Typography,
    Stack,
    Button,
  } from '@mui/material';
import { useEffect, useState} from 'react';
import Logo from '../ckb.png';
import { createWeb3 } from '../utils/createWeb3';

import CKBVaultJSON from '../artifacts/contracts/CKBVault.sol/CKBVault';

  export default function SafeBanner() {
    const [accounts, setAccounts] = useState();
    const [web3, setWeb3] = useState(null);
    

    const defaultAccount = accounts?.[0];

    async function createSafe() {

       const contract = new web3.eth.Contract(CKBVaultJSON.abi, "0xed553FcbcC9C9c7412CE7d84C80fa377dca11F3b");
  
       const tx = await contract.methods.createSafe().send({
            gas: 0x54d30,
            gasPrice: 0x0,
            from: defaultAccount
        });

        console.log(tx);
    }

    useEffect(() => {
        if (web3) {
            return;
        }
  
        (async () => {
            const _web3 = await createWeb3();
            setWeb3(_web3);
  
            const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccounts(_accounts);
            console.log({ _accounts });
        })();
    });

      return(
      <div>
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
                      <Button variant="contained" size='medium' color='primary' onClick={createSafe}>
                          Create
                      </Button>
                  </Grid>
              </Grid>
          </Card>
      </div>
      );
  };