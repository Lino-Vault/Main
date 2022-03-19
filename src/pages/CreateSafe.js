// material
import {
    Card,
    Container,
    CardHeader,
    IconButton
  } from '@mui/material';
  import { useNavigate } from 'react-router-dom';

  
  import { Icon } from '@iconify/react';
  import backArrowIos from '@iconify/icons-eva/arrow-ios-back-outline';
  // components
  import Page from '../components/Page';
  
  export default function Safes() {
      const navigate = useNavigate();

    return (
      <Page title="Safes | Lino Vault">
        <Container maxWidth="md">
          <Card sx={{mb: 3, pb: 3, position: 'relative'}}>
            <CardHeader title={'Create a Safe'} subheader={'Choose your collateral'}
            avatar={
                <IconButton
                color="secondary"
                onClick={() => navigate('/safes')}
                >
                    <Icon icon={backArrowIos} width={30} height={30}/>
                </IconButton>
            }
            />
          </Card>
        </Container>
      </Page>
    );
  }
  