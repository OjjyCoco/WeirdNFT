// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WeirdNFT is ERC721, ERC721Pausable, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint;
    uint256 private _nextTokenId;
    uint8 private constant MAX_SUPPLY = 50;
    uint256 private constant PRICE_PER_NFT = 1.2 ether; // change to usd later using Chainlink data feed
    string public baseURI; // ipfs://CID/

    bytes32 public merkleRoot;

    constructor(bytes32 _merkleRoot, string memory _baseURI)
        ERC721("WeirdNFT", "WRD")
        Ownable(msg.sender) {
        baseURI = _baseURI;
        merkleRoot = _merkleRoot;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, bytes32[] calldata _proof) external payable nonReentrant whenNotPaused returns (uint256) {
        require(isWhitelisted(to, _proof), "Not Whitelisted");
        require(totalSupply() + 1 <= MAX_SUPPLY, "Max supply exceeded");
        require(msg.value >= PRICE_PER_NFT, "Not enough funds");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }

    // for reveal
    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function tokenURI(uint _tokenId) public view virtual override(ERC721) returns(string memory) {
        // 0 => ipfs://CID/0.json
        // 1 => ipfs://CID/1.json
        // 2 => ipfs://CID/2.json
        require(_ownerOf(_tokenId) != address(0), "URI query for nonexistent token");

        // "ipfs://CID/" + _tokenId + ".json"
        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    function isWhitelisted(address _account, bytes32[] calldata _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked(_account)));
    }

    function withdraw() external nonReentrant onlyOwner {
        (bool success,) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
