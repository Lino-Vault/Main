// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CardHeader,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';

export default function Safes() {
  const navigate = useNavigate();

  return (
    <Page title="Safes | Lino Vault">
      <Container maxWidth="md">
        <Card sx={{mb: 3, pb: 3, position: 'relative'}}>
          <CardHeader title={'Your Safes'} subheader={'Manage your borrowing here'}
          action={<Button onClick={() => navigate('/safes/create')} sx={{mt: 2, mb: 2, textAlign: 'center'}} variant="contained" size='large'
          color='primary'>
            <Typography>
              Create Safe
            </Typography>
          </Button>}/>
        </Card>
        <Stack alignItems="center">
          <Typography variant="h2" color="white" sx={{mt: 2, mb: 2, textAlign: 'center'}}>
            No safes created yet.
          </Typography>
          <Button onClick={() => navigate('/safes/create')} sx={{mt: 2, mb: 2, textAlign: 'center'}} variant="contained" size='large' color='primary'>
            <Typography>Create a safe to start!</Typography>
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
