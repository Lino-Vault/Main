import Web3 from 'web3';
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import {PolyjuiceConfig } from "@polyjuice-provider/base";

export const createWeb3 = () =>
	new Promise(async(resolve, reject) => {

            const godwokenRpcUrl = 'https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/';

            const providerConfig = {
                web3Url: godwokenRpcUrl,
            };

            const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);

            const web3 = new Web3(provider || Web3.givenProvider);
            await window.ethereum.request({ method: 'eth_requestAccounts'});
            
            try {
                // Request account access if needed
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                reject('Failed');
            }
      
            resolve(web3);

      
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return null;
	});

    export const polyjuiceConfig: PolyjuiceConfig = {
        web3Url: "https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/",
      };

export const polyjuiceWeb3HttpProvider = new PolyjuiceHttpProvider(
    "https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/",
    polyjuiceConfig
);

export const polyjuiceWeb3 = new Web3(polyjuiceWeb3HttpProvider);