require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.API_URL,
      //chainId: 11155111,
      accounts: [`0x${PRIVATE_KEY}`],
      //gas: 210000000,
      //gasPrice: 800000000000,
        blockGasLimit: 10000000  // Adjust this number based on your needs
    },
  },
  solidity:{
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  } 
};