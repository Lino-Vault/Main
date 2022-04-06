const { existsSync } = require('fs');
const Web3 = require('web3');

const contractName = process.argv.slice(2)[0];

if (!contractName) {
    throw new Error(`No compiled contract specified to deploy. Please compile or create "src/examples/2-deploy-contract/artifacts/contracts/CONTRACT_NAME.sol/CONTRACT_NAME.json" file and provide its name as an argument to this program, eg.: "node index.js SimpleStorage"`);
}

let compiledContractArtifact = null;
const filenames = [`../src/artifacts/contracts/${contractName}.sol/${contractName}.json`, `./${contractName}`];
for(const filename of filenames)
{
    if(existsSync(filename))
    {
        console.log(`Found file: ${filename}`);
        compiledContractArtifact = require(filename);
        break;
    }
    else
        console.log(`Checking for file: ${filename}`);
}

if(compiledContractArtifact === null)
    throw new Error(`Unable to find contract file: ${contractName}`);

const DEPLOYER_PRIVATE_KEY = ''; // Replace this with your Ethereum private key with funds on Layer 2.

const web3 = new Web3('https://godwoken-testnet-web3-v1-rpc.ckbapp.dev');

const deployerAccount = web3.eth.accounts.wallet.add(DEPLOYER_PRIVATE_KEY);

(async () => {

    console.log(`Creating Safe`);

    const myContract = new web3.eth.Contract(compiledContractArtifact.abi, "0x30F96B934711E0e633CA065db2157DdAC03EC319");


    const deployTx = await myContract.methods.createSafe().send({
        from: deployerAccount.address,
        gas: 6000000,
    });

    console.log(deployTx);
   console.log('Created Safe')

})();

