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

   const initialize = await myContract.methods.initialize(200, "0x633B14f58A1343Aeb43e9C68c8aFB4c866eBb649", "CKBLVault", "CKBV", "0x7626b1add9A767B1A4676E7f64f0E342333A14A3", "0xbc756500F508b3a212B1084C5D9f730B9c8213c2").send({
       ...DEFAULT_SEND_OPTIONS,
       from: USER_ONE.address
   });
   console.log('Initialized vault successfully.')

})();