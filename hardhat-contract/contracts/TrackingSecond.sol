// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "./TrackingSagriChain.sol";

contract TrackingSecond is TrackingSagriChain {


    constructor() TrackingSagriChain() {}

       

    // function buyProductFromDistributor(uint256 productId) public {
    //     Product storage product = products[productId];
    //     require(product.exists, "Product does not exist.");
    //     require(product.quantity > 0, "Product is out of stock.");
    //     require(product.exists && keccak256(bytes(product.buyerRole)) == keccak256(bytes("1")), "Product is sold.");

    //     product.status = "sold";
    //     wholesalerProducts[msg.sender].push(productId);

    //     console.log("Product %s purchased by %s", productId, msg.sender);
    //     emit ProductPurchasedFromDistributor(productId, msg.sender);
    // }

    function getWholesalerProducts(address wholesaler) public view returns (Product[] memory, uint256[] memory) {
        uint256[] memory productIds = wholesalerProducts[wholesaler];
        Product[] memory productsBought = new Product[](productIds.length);
        uint256[] memory quantities = new uint256[](productIds.length);

        for (uint i = 0; i < productIds.length; i++) {
            uint256 productId = productIds[i];
            if (products[productId].exists) {
                productsBought[i] = products[productId];
                quantities[i] = products[productId].quantity;
            }
        }
        return (productsBought, quantities);
    }

    

    // function buyProductFromWholesaler(uint256 productId) public {
    //     Product storage product = products[productId];
    //     require(product.exists, "Product does not exist.");
    //     require(product.quantity > 0, "Product is out of stock.");
    //     require(keccak256(bytes(product.buyerRole)) == keccak256(bytes("1")), "Product is sold.");

    //     product.status = "sold";
    //     retailerProducts[msg.sender].push(productId);

    //     console.log("Product %s purchased by %s", productId, msg.sender);
    //     emit ProductPurchasedFromDistributor(productId, msg.sender);
    // }

    function getRetailerProducts(address retailer) public view returns (Product[] memory, uint256[] memory) {
        uint256[] memory productIds = retailerProducts[retailer];
        Product[] memory productsBought = new Product[](productIds.length);
        uint256[] memory quantities = new uint256[](productIds.length);

        for (uint i = 0; i < productIds.length; i++) {
            uint256 productId = productIds[i];
            if (products[productId].exists) {
                productsBought[i] = products[productId];
                quantities[i] = products[productId].quantity;
            }
        }
        return (productsBought, quantities);
    }

    function getDistributorProducts1(address distributor) public view returns (Product[] memory, uint256[] memory) {
        uint256[] memory productIds = distributorProducts[distributor];
        Product[] memory productsBought = new Product[](productIds.length);
        uint256[] memory quantities = new uint256[](productIds.length);

        for (uint i = 0; i < productIds.length; i++) {
            uint256 productId = productIds[i];
            if (products[productId].exists) {
                productsBought[i] = products[productId];
                quantities[i] = products[productId].quantity;
            }
        }
        return (productsBought, quantities);
    }

    function getConsumerProducts(address consumer) public view returns (Product[] memory, uint256[] memory) {
        uint256[] memory productIds = consumerProducts[consumer];
        Product[] memory productsBought = new Product[](productIds.length);
        uint256[] memory quantities = new uint256[](productIds.length);

        for (uint i = 0; i < productIds.length; i++) {
            uint256 productId = productIds[i];
            if (products[productId].exists) {
                productsBought[i] = products[productId];
                quantities[i] = products[productId].quantity;
            }
        }
        return (productsBought, quantities);
    }    

}
