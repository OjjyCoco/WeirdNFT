# WeirdNFT

**WeirdNFT** is an ERC721 smart contract written in Solidity, designed to manage a limited NFT collection with advanced features such as Merkle Tree-based whitelisting, paid minting, pausable functionality, and IPFS-based reveal system.

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

- **Max supply**: 50 NFTs
- **Mint price**: 1.2 ETH *(can be updated to a USD-based dynamic price using Chainlink in future versions)*
- **Merkle Tree** is used to validate whitelist participants. Participants are alloed to mint.
- **Metadata URIs**: dynamically built as `ipfs://CID/{id}.json`

## 🧰 Dependencies

This contract uses OpenZeppelin libraries:
- `ERC721`, `ERC721Enumerable`, `ERC721Pausable`
- `Ownable`, `ReentrancyGuard`
- `MerkleProof`, `Strings`

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
