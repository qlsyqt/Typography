const hre = require("hardhat");

async function main() {
  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");

  const nftFactory = await NFTFactory.attach(
    "0xA94cb21cB04A4a1A5De68c4609E459019263944e" // The deployed contract address
  );

  const tx = await nftFactory.createNFT("test name", "test symbol", "ipfs://");

  console.log("tx", tx);
  const receipt = await tx.wait();
  console.log("success receipt", receipt?.events?.[0]?.args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
