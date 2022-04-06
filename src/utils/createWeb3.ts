import Web3 from 'web3';

export const createWeb3 = () =>
	new Promise(async(resolve, reject) => {
        await window.ethereum.request({ method: 'eth_requestAccounts'});
        const chainId = 868455272153094;

        const web3 = new Web3(window.ethereum);

        if(window.ethereum.networkVersion !== chainId) {
            try{
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }],
              });
            } catch (err) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Godwoken Testnet',
                      chainId: web3.utils.toHex(chainId),
                      nativeCurrency: { name: 'CKB', decimals: 18, symbol: 'CKB' },
                      rpcUrls: ['https://godwoken-testnet-web3-v1-rpc.ckbapp.dev'],
                    },
                  ],
                });
        }
    }
            
        try {
            // Request account access if needed
            await window.ethereum.enable();
            resolve(web3);
        } catch (error) {
            // User denied account access...
            reject('Failed');
        }
    
        resolve(web3);

      
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return null;
	});