import { PolyjuiceAccounts, PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import Web3 from 'web3';
import { readFile } from 'fs/promises';

import CONFIG from '../src/config.js';

(async () => {
    const LinoBVaultJSON = JSON.parse(
        await readFile(
            new URL('../src/artifacts/contracts/LinoBVault.sol/LinoBVault.json', import.meta.url)
        )
    );

    const DEFAULT_SEND_OPTIONS = {
        gas: 1000000,
        gasPrice: 0
      };


    const providerConfig = {
        web3Url: CONFIG.HTTP_RPC_URL
    };

    const provider = new PolyjuiceHttpProvider(providerConfig.web3Url, providerConfig);

    const polyjuiceAccounts = new PolyjuiceAccounts(providerConfig);

    const web3 = new Web3(provider);
    web3.eth.accounts = polyjuiceAccounts;
    web3.eth.Contract.setProvider(provider, web3.eth.accounts);

    const USER_ONE = web3.eth.accounts.wallet.add(CONFIG.USER_ONE_PRIVATE_KEY);

   const myContract = new web3.eth.Contract(LinoBVaultJSON.abi, "0xaE88EB7BFF659f6a230658397e3B0D5b495d07Fb");

   const initialize = await myContract.methods.initialize(200, "0x1363bdCE312532F864e84924D54c7dA5eDB5B1BC", "ETHLVault", "ETHV", "0x76FebBBE670De113b78858edB2a831A63fB9bB06").send({
       ...DEFAULT_SEND_OPTIONS,
       from: USER_ONE.address
   });
   console.log('Initialized vault successfully.')

})();