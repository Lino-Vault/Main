import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

import DebtIcon from '../../../debtIcon.png';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.lighter,
  backgroundColor: theme.palette.warning.darker
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.light,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.light,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 80323;

export default function TotalDebt() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon sx={{mt: '1px'}}>
          <img src={DebtIcon} height={60} width={110}/>  
        </Icon>
      </IconWrapperStyle>
      <Typography variant="h3">${fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Debt
      </Typography>
    </RootStyle>
  );
}
