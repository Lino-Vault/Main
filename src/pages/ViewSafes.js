// material
import { Container, Typography, Card, CardHeader } from '@mui/material';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function ViewSafes() {

  return (
    <Page title="View Safes | Lino Vault">
      <Container maxWidth='md'>
        <Card>
          <CardHeader title={'Safes close to liquidation'} 
          subheader={'All safes where users have borrowed larger than 80% of the max LTV are displayed'}
          />
          <Typography variant="h4" color="inherit" sx={{ mt: 5, mb: 5, textAlign: 'center' }}>
            No vaults close to liquidation.
          </Typography>
        </Card>
      </Container>
    </Page>
  );
}
