import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers';
// import fs from 'fs';

const whitelist = [
  "0xeBeD07e7187Ad23c676225C63279955f73AbBb45",
  "0x08563D773E6A5073116fb0fFAbF411066726add7",
  "0xC30399d1f8a113c4845eB98Ba94fABf91542bc08"
].map(addr => addr.toLowerCase()); // ensure lowercase

// Hash addresses
const leafNodes = whitelist.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

// Get root
const merkleRoot = merkleTree.getHexRoot();
console.log("Merkle Root:", merkleRoot);
// console.log("merkleTree: ", merkleTree);

// Optionally: write Merkle tree and proofs to file
// const proofs: Record<string, string[]> = {};
// whitelist.forEach(addr => {
//   const proof = merkleTree.getHexProof(keccak256(addr));
//   proofs[addr] = proof;
// });

// fs.writeFileSync('proofs.json', JSON.stringify(proofs, null, 2));
// fs.writeFileSync('merkleRoot.txt', merkleRoot);

function getProof(address: string): string[] {
    return merkleTree.getHexProof(keccak256(address.toLowerCase()));
}
export { getProof, merkleTree, merkleRoot };


// In order to retrieve the Merkle proof for a given address :

// import proofs from './proofs.json';

// const address = '0x123...abc'.toLowerCase();
// const proof = proofs[address]; // this is your bytes32[] proof

