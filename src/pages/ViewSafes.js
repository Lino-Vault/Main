import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography, Card, CardHeader } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//
import PRODUCTS from '../_mocks_/products';

// ----------------------------------------------------------------------

export default function ViewSafes() {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

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
