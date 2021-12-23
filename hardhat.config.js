require('@nomiclabs/hardhat-web3');
require('@openzeppelin/hardhat-upgrades');


module.exports = {
    solidity: {
      compilers: [
        {
          version: "0.8.4",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            }
          },
        },
        {
          version: "0.6.6",
        }
      ],
  },
    paths: {
        artifacts: "./src/artifacts"
    }
};
