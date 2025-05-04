import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WeirdNFTModule = buildModule("WeirdNFTModule", (m) => {
  const merkleRoot = m.getParameter(
    "merkleRoot",
    "0xe184b042c085bcfcf134a0d3dfb64c6d1b7bf1e8dfe5777cb4de0658d1b0634f"
  );

  const baseURI = m.getParameter(
    "baseURI",
    "ipfs://bafybeib43275il24ahvkomop2mc4f3k67cklgemsxgjjffm7b7q3clf64u/"
  );

  const weirdNFT = m.contract("WeirdNFT", [merkleRoot, baseURI]);

  return { weirdNFT };
});

export default WeirdNFTModule;
