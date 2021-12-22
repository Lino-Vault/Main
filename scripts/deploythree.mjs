import { PolyjuiceAccounts, PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import Web3 from 'web3';
import { readFile } from 'fs/promises';

import CONFIG from '../src/config.js';

(async () => {
    const WCKBJSON = JSON.parse(
        await readFile(
            new URL('../src/artifacts/contracts/WCKB.sol/WCKB.json', import.meta.url)
        )
    );

    const LinoBTokenJSON = JSON.parse(
        await readFile(
            new URL('../src/artifacts/contracts/LinoBToken.sol/LinoBux.json', import.meta.url)
        )
    );

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

    const vaultContract = new web3.eth.Contract(BandOracleJSON.abi, "0x6533cc1530193bAfE882B3ceDC3B14F7B149A5dA");
    
    const getPrice = await vaultContract.methods.getPrice("CKB", "USD").call();
   console.log(getPrice / 10**18)

})();
