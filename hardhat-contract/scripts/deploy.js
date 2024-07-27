// scripts/deploy_distributorContract.js

async function main() {
  const [deployer] = await ethers.getSigners();

//   // Assume we already have the deployed TrackingSagriChain address
//   const trackingSagriChainAddress = "0xb86E056Df0e5dA8E7C5f94d84d3d86be055FD9E0";  // Replace with the actual address

  // Fetch the contract factory
  const TrackingSecond = await ethers.getContractFactory("TrackingSecond");

  // Deploy the contract, passing the address of TrackingSagriChain
  const trackingSecond = await TrackingSecond.deploy();

  // Wait for the deployment to be finalized
  await trackingSecond.deployed();

  console.log("TrackingSecond deployed to:", trackingSecond.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
