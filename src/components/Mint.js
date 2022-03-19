import * as React from 'react';

// material
import { styled } from '@mui/material/styles';
import { Card,  
  FormControl, 
  FilledInput, 
  InputLabel,
  FormHelperText, 
  Container, 
  Typography, 
  Button, 
  Box, 
  CardHeader, 
  Avatar, 
  Grid, 
  Paper
} from '@mui/material';


// components
import Chevron from '@iconify/icons-fluent/chevron-double-down-16-filled'
import USDC from '../usdc.svg';
import { Icon } from '@iconify/react';
import Lino from '../lino_icon.png';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: "#2D3748"
  }));

export const Mint = () => {
  return (
    <Container maxWidth='sm'>
    <Card sx={{ mt:7, backgroundColor: "#2D3748"}}>
      <CardHeader title="USDC Exchange" avatar={<Avatar alt="USDC" src={USDC} />} 
      sx={{flexGrow: 1, 
      flexShrink: 1, 
      flexBasis: 'auto'
      }}/>
      <Grid container spacing={0} mt={0} display={"flex"}>
        <Grid item xs={6} sm={6} sx={{ flexBasis: '50%', 
        flexGrow: 0, 
        maxWidth: '50%', 
        m: 0, 
        flexDirection: 'row', 
        justifyContent: 'center'
        }}>
          <Item><Typography variant='h4'>Balance:</Typography></Item>
        </Grid>
        <Grid item xs={6} sm={6} sx={{ flexBasis: '50%', flexGrow: 0, maxWidth: '50%', flexDirection: 'row', justifyContent: 'center', m: 0}}>
          <Item><Typography variant='h4'>0 USDC</Typography></Item>
        </Grid>
        <Grid item xs={12} sx={{ boxSizing: 'border-box', m: 0, flexDirection: 'row', flexBasis: '100%', flexGrow: 0, maxWidth: '100%', justifyContent: 'center'}}>
          <Box sx={{ width: '80%', mt: '16px', mr: 'auto', mb: '16px', ml: 'auto'}}>
          <Item>
            <FormControl sx={{ display: 'inline-flex', 
            position: 'relative', 
            minWidth: 0, 
            padding: 0, 
            margin: 0, 
            border: 0, 
            verticalAlign: 'top', 
            width: '100%', 
            flexDirection: 'column'
            }}>
              <InputLabel htmlFor="my-input" sx={{mt: 2, 
                zIndex: 1, 
                position: 'absolute', 
                fontWeight: 500, 
                whiteSpace: 'nowrap', 
                textOverflow: 'ellipsis'
                }}>
                  Amount
                </InputLabel>
              <FilledInput 
              id="my-input" 
              aria-describedby="my-helper-text"
              sx={{ width: '100%', 
              alignItems: 'center', 
              position: 'relative', 
              cursor: 'text', 
              boxSizing: 'border-box', 
              fontWeight: 500,
              pl: '12px',
              pr: '12px',
              display: 'inline-flex'
            }}
              startAdornment={<Avatar alt="USDC" src={USDC} sx={{height: 20, width: 20, mt: 2, mr: 1}}/>}
              endAdornment={<Button>Max</Button>}
              />
              <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
          </Item>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ maxWidth: '100%', justifyContent: 'center', flexGrow: 0, flexBasis: '100%', flexDirection: 'row'}}>
          <Item>
            <Icon icon={Chevron} width={24} height={24}/>
          </Item>
        </Grid>
        <Grid item xs={12} sx={{ boxSizing: 'border-box', mb: '8px',flexDirection: 'row', flexBasis: '100%', flexGrow: 0, maxWidth: '100%', justifyContent: 'flex-start', display: 'flex'}}>
          <Box sx={{width: '80%', mr: 'auto', ml: 'auto'}}>
            <Item>
            <Typography variant='subtitle2' sx={{textAlign: 'left'}}>
              Expected Output
            </Typography>
            </Item>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ boxSizing: 'border-box', mr: 0, mb: '16px', ml: 0, flexDirection: 'row', flexBasis: '100%', flexGrow: 0, maxWidth: '100%', justifyContent:'flex-start'}}>
            <Box sx={{ ml: 'auto', mr: 'auto', width: '80%'}}>
            <Item>
              <FormControl sx={{ display: 'inline-flex', position: 'relative', minWidth: '0px', p: '0px', m: '0px', verticalAlign: 'top', width: '100%'}}>
                <InputLabel disabled shrink variant='filled' color='primary'
                sx={{ display: 'block', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                transformOrigin: 'left top', 
                zIndex: 1, 
                position: 'absolute'}}>
                Amount
                </InputLabel>
                <FilledInput color='primary' disabled fullWidth startAdornment={
                <Avatar alt="Lino" 
                src={Lino} 
                sx={{height: 20, 
                width: 20, 
                mt: 2, 
                mr: 1}}/>
                }
                />
              </FormControl>
              </Item>
            </Box>
        </Grid>
        <Grid item xs={6} sx={{ boxSizing: 'border-box', mt: '0px', mr: '0px', mb: '16px', ml: '0px', flexDirection: 'row', flexBasis: '50%', flexGrow: 0, maxWidth: '50%', justifyContent: 'flex-end', display: 'flex'}}>
          <Button size='lg' sx={{ boxShadow: 'none', backgroundColor: '#4A5568', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxSizing: 'border-box', mr: '8px', verticalAlign: 'midle', fontWeight: 700, borderRadius: '8px', pt: '8px', pr: '22px', pb: '8px', pl: '22px', minWidth: '150px'}}>
            Approve USDC
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ boxSizing: 'border-box', mt: '0px', mr: '0px', mb: '16px', ml: '0px', flexDirection: 'row', flexBasis: '50%', flexGrow: 0, maxWidth: '50%', justifyContent: 'flex-start', display: 'flex'}}>
          <Button type='submit' size='lg' sx={{ boxShadow: 'none', backgroundColor: '#4A5568', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxSizing: 'border-box', mr: '8px', verticalAlign: 'midle', fontWeight: 700, borderRadius: '8px', pt: '8px', pr: '22px', pb: '8px', pl: '22px', minWidth: '150px'}}>
            Exchange
          </Button>
        </Grid>
      </Grid>
    </Card>
    </Container>
  )
};