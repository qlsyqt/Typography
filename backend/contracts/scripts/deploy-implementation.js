const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory("NFT");

  const implementation = await hre.upgrades.deployProxy(NFT, [
    "KNN3 NFT",
    "KNN3",
    "ipfs://",
  ]);

  await implementation.deployed();
  console.log("NFT deployed to:", implementation.address);

  await implementation.mint();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
