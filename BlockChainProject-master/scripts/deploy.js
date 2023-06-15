const hre = require("hardhat");

async function main() {
  // Deploying the contrac
 
  const Inventory = await hre.ethers.getContractFactory("Inventory");
  const finePercentage = 10; // Set your desired value for the constructor parameter
  const inventory = await Inventory.deploy(finePercentage);
  

  // Wait for the contract to be mined
  await inventory.deployed();

  // Log the deployed contract address
  console.log("Inventory deployed to:", inventory.address);
}

main().catch((error) => {
  console.error(error);
  
  process.exitCode = 1;
});