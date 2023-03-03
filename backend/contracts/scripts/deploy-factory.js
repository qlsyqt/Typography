const hre = require("hardhat");

async function main() {
  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");
  // MUMBAI

  const factory = await NFTFactory.deploy();

  await factory.deployed();

  console.log("NFTFactory deployed to:", factory.address); // 0xf84e528474ec8b6f9d9BF28Ac0e748B75a8F083b
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
