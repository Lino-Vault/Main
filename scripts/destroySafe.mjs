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

   const myContract = new web3.eth.Contract(LinoBVaultJSON.abi, "0x7bd24dfACCCb6F80D6Cb40541842d0A03cf2B908");

   const initialize = await myContract.methods.destorySafe(1).send({
       ...DEFAULT_SEND_OPTIONS,
       from: USER_ONE.address
   });
   console.log('Destroyed safe.')

})();