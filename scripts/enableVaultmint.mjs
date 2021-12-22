import { PolyjuiceAccounts, PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import Web3 from 'web3';
import { readFile } from 'fs/promises';

import CONFIG from '../src/config.js';

(async () => {

    const LinoBTokenJSON = JSON.parse(
        await readFile(
            new URL('../src/artifacts/contracts/LinoBToken.sol/LinoBux.json', import.meta.url)
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

    const tokenContract = new web3.eth.Contract(LinoBTokenJSON.abi, "0xaF0379AEbb17581aa9FfFAdA6e1157126D098Ae9");
    
    const addedMint = await tokenContract.methods.addBurner("0x443B7B1b4661F8Cb2e37eF79444BB02D58d4F6aB").send({
       ...DEFAULT_SEND_OPTIONS,
       from: USER_ONE.address
   });
   console.log("Added minter successfully.")

})();
