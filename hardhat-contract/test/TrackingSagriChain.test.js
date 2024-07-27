// test/TrackingSagriChain.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TrackingSagriChain", function () {
  let trackingContract;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const TrackingSagriChain = await ethers.getContractFactory("TrackingSagriChain");
    trackingContract = await TrackingSagriChain.deploy();
    await trackingContract.deployed();
  });

  it("should allow a farmer to add a product", async function () {
    await trackingContract.addProduct("Apple", 100, 50, "Fruit");
    const product = await trackingContract.products(1);
    expect(product.name).to.equal("Apple");
  });

  it("should fetch a product by ID", async function () {
    await trackingContract.addProduct("Apple", 100, 50, "Fruit");
    const product = await trackingContract.getProduct(1);
    expect(product.name).to.equal("Apple");
  });
});
