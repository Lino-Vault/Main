import { Link as RouterLink } from 'react-router-dom';
import * as React from 'react';

// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography, Button, Box, ToggleButton, ToggleButtonGroup} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Page title="Dashboard: Blog | Minimal-UI">
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <Card sx={{p:5}}>
            <Typography variant="h4" gutterBottom sx={{color: "white"}}>
              USDC Exchange
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" >
            <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            >
              <ToggleButton value="mint">Mint</ToggleButton>
              <ToggleButton value="redeem">Redeem</ToggleButton>
            </ToggleButtonGroup>
            </Box>
          </Card>
        </Stack>

      </Container>
    </Page>
  );
}
