// scripts/deploy.js

const { ethers } = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run('compile');

  // Deploy the contract
  const GiftCardNFT = await ethers.getContractFactory("GiftCardNFT");
  const giftCardNFT = await GiftCardNFT.deploy();

  await giftCardNFT.deployed();

  console.log("GiftCardNFT deployed to:", giftCardNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
