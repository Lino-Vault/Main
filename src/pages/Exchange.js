import * as React from 'react';

// material
import { Card, 
  Stack, 
  Container, 
  Typography, 
  Box, 
  ToggleButton, 
  ToggleButtonGroup
} from '@mui/material';

import { useState } from 'react';
// components
import Page from '../components/Page';
import { Mint } from '../components/Mint';
import { Redeem } from '../components/Redeem';
// ----------------------------------------------------------------------

export default function Exchange() {


  const [view, changeView] = useState('mint');
  
  const handleChangeView = () => {
    changeView(view === 'mint' ? 'redeem' : 'mint');
  };

  return (
    <Page title="Exchange USDC | Lino Vault">
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Card sx={{p:5, backgroundColor: "#2D3748"}}>
            <Typography variant="h4" gutterBottom sx={{color: "white"}}>
              USDC Exchange
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" >
            <ToggleButtonGroup
            color="primary"
            value={view}
            onClick={handleChangeView}
            >
              <ToggleButton value="mint" aria-label="mint">Mint</ToggleButton>
              <ToggleButton value="redeem" aria-label="redeem">Redeem</ToggleButton>
            </ToggleButtonGroup>
            </Box>
          </Card>
        </Stack>
        {view === 'mint' ? <Mint/> : ''}
        {view === 'redeem' ? <Redeem/> : ''}
      </Container>
    </Page>
  );
}
