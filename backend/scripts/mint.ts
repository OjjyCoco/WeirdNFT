import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { getProof } from "./merkleTree";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_RPC);
  const wallet = new ethers.Wallet(process.env.SEPOLIA_ACC_PRIVATE_KEY!, provider);

  const contractAddress = "0x415f1F5495916957247e3C9BF5f953D9321c5fb5";
  const contractABI = [
    "function safeMint(address to, bytes32[] calldata _proof) external payable returns (uint256)"
  ];

  const nftContract = new ethers.Contract(contractAddress, contractABI, wallet);

  const proof = getProof(wallet.address);
  const price = ethers.parseEther("0.01");

  const tx = await nftContract.safeMint(wallet.address, proof, {
    value: price,
  });

  console.log("Minting NFT...");
  const receipt = await tx.wait();
  console.log("NFT minted in tx:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
