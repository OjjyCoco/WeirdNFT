import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { Contract, Signer } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("WeirdNFT", function () {
  let weirdNFT: Contract;
  let owner: Signer;
  let user1: Signer;
  let whitelistAddresses: string[];
  let merkleTree: MerkleTree;
  let merkleRoot: string;
  let baseURI: string;

  async function deployFixture() {
    [owner, user1] = await ethers.getSigners();
    
    whitelistAddresses = [(await owner.getAddress()), (await user1.getAddress())];
    const leaves = whitelistAddresses.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    merkleRoot = merkleTree.getHexRoot();
    baseURI = "ipfs://CID/";

    const WeirdNFTFactory = await ethers.getContractFactory("WeirdNFT");
    const deployed = await WeirdNFTFactory.deploy(merkleRoot, baseURI);
    await deployed.waitForDeployment();
    const weirdNFT = await ethers.getContractAt("WeirdNFT", await deployed.getAddress());

    return { weirdNFT, owner, user1, merkleTree };
  }

  describe("Deployment", function () {
    it("should deploy with correct baseURI and merkleRoot", async () => {
      const { weirdNFT } = await loadFixture(deployFixture);
      expect(await weirdNFT.baseURI()).to.equal("ipfs://CID/");
      expect(await weirdNFT.merkleRoot()).to.be.properHex;
    });
  });

  describe("pause/unpause", function () {
    it("should pause and unpause correctly", async () => {
      const { weirdNFT } = await loadFixture(deployFixture);
      await weirdNFT.pause();
      expect(await weirdNFT.paused()).to.be.true;

      await weirdNFT.unpause();
      expect(await weirdNFT.paused()).to.be.false;
    });
  });

  describe("safeMint", function () {
    it("should mint if whitelisted and enough ETH", async () => {
      const { weirdNFT, user1, merkleTree } = await loadFixture(deployFixture);
      const proof = merkleTree.getHexProof(keccak256(await user1.getAddress()));

      await weirdNFT.connect(user1).safeMint(await user1.getAddress(), proof, {
        value: ethers.parseEther("1.2"),
      });

      expect(await weirdNFT.totalSupply()).to.equal(1);
      expect(await weirdNFT.ownerOf(0)).to.equal(await user1.getAddress());
    });

    it("should fail if not whitelisted", async () => {
      const { weirdNFT } = await loadFixture(deployFixture);
      const unlisted = ethers.Wallet.createRandom().address;
      const proof: string[] = [];

      await expect(
        weirdNFT.safeMint(unlisted, proof, {
          value: ethers.parseEther("1.2"),
        })
      ).to.be.revertedWith("Not Whitelisted");
    });

    it("should fail if not enough funds", async () => {
      const { weirdNFT, user1, merkleTree } = await loadFixture(deployFixture);
      const address = await user1.getAddress();
      const proof = merkleTree.getHexProof(keccak256(address));

      await expect(
        weirdNFT.connect(user1).safeMint(address, proof, {
          value: ethers.parseEther("0.005"),
        })
      ).to.be.revertedWith("Not enough funds");
    });
  });

  describe("setBaseURI", function () {
    it("should set baseURI", async () => {
      const { weirdNFT } = await loadFixture(deployFixture);
      await weirdNFT.setBaseURI("ipfs://bafybeihst2g4wg3ifd3ihh6f53o5skcz76y2do3b4wt5udcw4a2hj3x4dm/");
      expect(await weirdNFT.baseURI()).to.equal("ipfs://bafybeihst2g4wg3ifd3ihh6f53o5skcz76y2do3b4wt5udcw4a2hj3x4dm/");
    });
  });

  describe("tokenURI", function () {
    it("should return correct tokenURI after mint", async () => {
      const { weirdNFT, user1, merkleTree } = await loadFixture(deployFixture);
      const address = await user1.getAddress();
      const proof = merkleTree.getHexProof(keccak256(address));

      await weirdNFT.connect(user1).safeMint(address, proof, {
        value: ethers.parseEther("1.2"),
      });

      const uri = await weirdNFT.tokenURI(0);
      expect(uri).to.equal("ipfs://CID/0.json");
    });

    it("should revert if token does not exist", async () => {
      const { weirdNFT } = await loadFixture(deployFixture);
      await expect(weirdNFT.tokenURI(0)).to.be.revertedWith("URI query for nonexistent token");
    });
  });

  describe("withdraw", function () {
    it("should withdraw funds to owner", async () => {
      const { weirdNFT, owner, user1, merkleTree } = await loadFixture(deployFixture);
      const address = await user1.getAddress();
      const proof = merkleTree.getHexProof(keccak256(address));

      await weirdNFT.connect(user1).safeMint(address, proof, {
        value: ethers.parseEther("1.2"),
      });

      const balanceBefore = await ethers.provider.getBalance(await owner.getAddress());
      const tx = await weirdNFT.withdraw();
      const receipt = await tx.wait();
      const balanceAfter = await ethers.provider.getBalance(await owner.getAddress());

      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });
  });
});
