import Web3 from 'web3';

export const createWeb3 = () =>
	new Promise(async(resolve, reject) => {
        await window.ethereum.request({ method: 'eth_requestAccounts'});

        const web3 = new Web3(window.ethereum);
            
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