<p align="center">
  <img src="https://moccasin-general-crow-156.mypinata.cloud/ipfs/bafybeibcuex3mj7fbrybiri5wlrg3br5n5kdigqlgowhko36k7vrmuk7oi/0.png" alt="WeirdNFT#0 image" width="300"/>
</p>

# WeirdNFT

**WeirdNFT** is an ERC721 smart contract written in Solidity, designed to manage a limited NFT collection with advanced features such as Merkle Tree-based whitelisting, paid minting, pausable functionality, and IPFS-based reveal system. A minting landing page might be created later on, for now we use scripts to interact with the contract.

## ✨ Features

- ✅ Standard ERC721 compliant (OpenZeppelin)
- 🧾 Paid minting (Constant Price in ETH per NFT)
- 🌿 Whitelisting using Merkle Tree
- 📦 IPFS-based metadata storage
- 🔒 Pausable minting functionality
- 🧵 Limited supply
- 🛑 Reentrancy protection
- 🔐 Secure withdrawal function (owner-only)

## 📜 Technical Details

- **Max supply**: 100 NFTs
- **Mint price**: 0.01 ETH *(can be updated to a USD-based dynamic price using Chainlink in future versions)*
- **Merkle Tree** is used to validate whitelist participants. Participants are alloed to mint.
- **Metadata URIs**: dynamically built as `ipfs://CID/{id}.json`

## 🚀 Deployment

- The contract has been deployed on the Sepolia testnet : [**Sepolia/WeirdNFT**](https://sepolia.etherscan.io/address/0x415f1F5495916957247e3C9BF5f953D9321c5fb5)
- App interface has been deployed using AWS Amplify : [**WeirdNFT App**](https://master.d2k68jp0vzz3dq.amplifyapp.com/)
- The owner has minted the first NFT for testing purpose : [**testnets.Opensea.io**](https://testnets.opensea.io/0xeBeD07e7187Ad23c676225C63279955f73AbBb45)

## 🔧 Main Functions

### `safeMint(address to, bytes32[] calldata _proof)`
Allows a whitelisted address to mint a new NFT. Requirements:
- A valid Merkle proof
- Sufficient payment (`>= 1.2 ether`)
- Contract must not be paused
- Supply must not be exceeded

Returns the minted token ID.

### `pause()` / `unpause()`
Owner-only functions to pause and resume minting operations.

### `setBaseURI(string memory _baseURI)`
Sets the base URI for token metadata. Useful for *revealing* IPFS metadata.

### `tokenURI(uint _tokenId)`
Returns the full metadata URI for a given token. Example: `ipfs://CID/1.json`

### `withdraw()`
Allows the contract owner to securely withdraw all collected funds.

### `isWhitelisted(address _account, bytes32[] calldata _proof)`
Internal view function to verify if an address is included in the Merkle Tree whitelist.

## 🎨 NFT Generation

The NFT images and metadata were generated using [**nftchef/art-engine**](https://github.com/nftchef/art-engine), a customizable node.js tool for generating generative art collections from layers.

## 🧪 Tests

Tests have been written using **Hardhat**, **Chai**, and **Ethers.js**.

- ✅ **Contract deployment** with correct `baseURI` and `merkleRoot`
- ✅ **Whitelist minting** using valid Merkle proof
- ✅ Rejection of **non-whitelisted** minting attempts
- ✅ Rejection of **underpaid** mint transactions
- ✅ Full support for `pause()` and `unpause()` logic
- ✅ Validation of `tokenURI` structure after mint
- ✅ Enforcement of **owner-only access** to `setBaseURI`
- ✅ Secure `withdraw()` functionality, restricted to contract owner

## 🧰 Dependencies

This contract uses OpenZeppelin libraries:
- `ERC721`, `ERC721Enumerable`, `ERC721Pausable`
- `Ownable`, `ReentrancyGuard`
- `MerkleProof`, `Strings`
