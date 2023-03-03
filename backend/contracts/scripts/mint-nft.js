const hre = require("hardhat");

async function main() {
  const NFTFactory = await hre.ethers.getContractFactory("NFT");
  const nft = await NFTFactory.attach(
    "0x6165BCE521aFa696eF730Ede88b18e46eaA1C9b7" // The deployed contract address
  );

  const tx = await nft.mint();

  // const tx = await token.safeMint("");
  console.log("tx", tx);
  await tx.wait();
  console.log("success");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
