import * as React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import MetaMask from '../../metamask.svg';
import WalletConnect from '../../walletconnect.svg';
import { useEffect, useState} from 'react';
<<<<<<< Updated upstream
import { createWeb3 } from '../../utils/createWeb3';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
=======
import * as React from 'react';
import { createWeb3, polyjuiceWeb3 } from '../../utils/createWeb3';
import { 
  Card, 
  Typography, 
  Dialog, 
  DialogTitle, 
  ListItemText, 
  ListItemAvatar, 
  ListItem, 
  List, 
  Avatar, 
  Button,
  styled,
  Stack
} from '@mui/material';
>>>>>>> Stashed changes
import { AddressTranslator } from 'nervos-godwoken-integration';


export default function WalletPopover() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState();
  const [polyjuiceAddress, setPolyjuiceAddress] = useState();
  const [open, setOpen] = React.useState(false);
  const [l2Balance, setL2Balance] = useState();

  const defaultAccount = accounts?.[0];

  useEffect(() => {
    if (defaultAccount) {
        const addressTranslator = new AddressTranslator();
        setPolyjuiceAddress(addressTranslator.ethAddressToGodwokenShortAddress(defaultAccount));
    } else {
        setPolyjuiceAddress(undefined);
    }
}, [defaultAccount]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle textAlign='center' bgcolor='#2D3748'>Connect Wallet</DialogTitle>
        <List sx={{ pt: 0}}>
  
            <ListItem button onClick={triggerWeb3} sx={{ padding:8, pl:10, pr:10}}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#1A202C'}}>
                  <Icon>
                    <img src={MetaMask} height={45} width={45}/>  
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="MetaMask" />
            </ListItem>
  
          <ListItem button sx={{padding:8, pl: 10, pr: 10}}>
            <ListItemAvatar>
              <Avatar>
                <Icon>
                    <img src={WalletConnect} height={45} width={45}/>  
                </Icon>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="WalletConnect" />
          </ListItem>
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  async function triggerWeb3() {
    const web3 = await createWeb3();
    setWeb3(polyjuiceWeb3);
    
    // eslint-disable-next-line no-undef
    const done = BigInt(0);
    setL2Balance(done);

    const _accounts = [window.ethereum.selectedAddress];
    setAccounts(_accounts);

  }
  
  useEffect(() => {
    if (l2Balance) {
        return;
    }

    (async () => {
      const _web3 = await createWeb3();
      setWeb3(_web3);
        if (accounts && accounts[0]) {
            // eslint-disable-next-line no-undef
            const _l2Balance = BigInt(await web3.eth.getBalance(accounts[0]));
            setL2Balance(_l2Balance);
        }
    })();
});
  
    return accounts ? (
      <>
        <Card sx={{ backgroundColor: "#2D3748", p: 0.8, textAlign: "center"}} size="small">
          {(l2Balance / 10n ** 8n).toString() } CKB
          <Button sx={{backgroundColor: '#1A202C', ml: 1}} size="small">
            <Typography>
              {polyjuiceAddress &&
              `${polyjuiceAddress.slice(0, 6)}...${polyjuiceAddress.slice(
                polyjuiceAddress.length - 4,
                polyjuiceAddress.length
              )}`}
            </Typography>
          </Button>
        </Card>
      </>
    ) : (
      <>
        <Button variant='contained'
        onClick={handleClickOpen}
      >
          Connect Wallet
        </Button>
        <SimpleDialog
        open={open}
        onClose={handleClose}
        />
      </>
    );
  }