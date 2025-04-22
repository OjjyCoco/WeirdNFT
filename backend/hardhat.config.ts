import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
require("hardhat-gas-reporter");

const ALCHEMY_MAINNET_RPC = process.env.ALCHEMY_MAINNET_RPC || ''
const ALCHEMY_SEPOLIA_RPC = process.env.ALCHEMY_SEPOLIA_RPC || ''
const SEPOLIA_ACC_PRIVATE_KEY = process.env.SEPOLIA_ACC_PRIVATE_KEY || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    // L1Etherscan: process.env.ETHERSCAN_API_KEY
  },  
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        enabled: false,
        url: ALCHEMY_MAINNET_RPC,
        blockNumber: 22180761
      },
    },
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC,
      accounts: [`0x${SEPOLIA_ACC_PRIVATE_KEY}`],
      chainId: 11155111,
      // blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    }
  }
};

export default config;