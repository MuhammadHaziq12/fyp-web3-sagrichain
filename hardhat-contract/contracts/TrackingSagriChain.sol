// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract TrackingSagriChain {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        uint256 quantity;
        string category;
        address ownerID;
        string ownerRole;
        string imageHash;
        string productReferenceID;
        //string status;
        bool exists;
    }

    struct History {
        address buyer;
        string role;
        uint256 timestamp;
        uint256 mainProductId;
        uint256 referenceProductId;
    }

    uint256 public productCount = 0;
    uint256 public farmerSoldCount = 0;
    uint256 public salesCount;
    mapping(uint256 => Product) public products;
    mapping(uint256 => History[]) public productHistory;
    mapping(address => uint256[]) public farmerProducts;
    mapping(address => uint256[]) public distributorProducts;
    mapping(address => uint256[]) public wholesalerProducts;
    mapping(address => uint256[]) public retailerProducts;
    mapping(address => uint256[]) public consumerProducts;

    mapping(address => mapping(uint256 => uint256)) public distributorProductQuantities;
    mapping(address => mapping(uint256 => uint256)) public wholesalerProductQuantities;
    mapping(address => mapping(uint256 => uint256)) public retailerProductQuantities;
    mapping(address => mapping(uint256 => uint256)) public consumerProductQuantities;

    event ProductPurchasedFromFarmer(uint256 productId, address buyer, string role);
    event ProductPurchasedFromDistributor(uint256 productId, address wholesaler);
    event ProductAdded(
        uint256 id,
        string name,
        uint256 price,
        uint256 quantity,
        string category,
        address ownerID,
        string ownerRole,
        string imageHash,
        string productReferenceID
        //string status
    );
    event ProductDeleted(uint256 id);
    event ProductBought(uint256 productId, address buyer, string role);

    function addProduct(
        string memory _name,
        uint256 _price,
        uint256 _quantity,
        string memory _category,
        string memory _ownerRole,
        string memory _imageHash
    ) public {
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            _quantity,
            _category,
            msg.sender,
            _ownerRole,
            _imageHash, // Initial imageHash is set to empty string
            "", // Initial productReferenceID is set to empty string
            //"unsold", // Initial status is set to "unsold"
            true
        );
        farmerProducts[msg.sender].push(productCount);
        emit ProductAdded(
            productCount,
            _name,
            _price,
            _quantity,
            _category,
            msg.sender,
            _ownerRole,
            _imageHash, 
            ""
            //"unsold"
        );
        productHistory[productCount].push(History({
            buyer: msg.sender,
            role: "farmer",
            timestamp: block.timestamp,
            mainProductId: productCount,
            referenceProductId: 0
        }));
    }


    function getFarmerProducts() public view returns (Product[] memory) {
        uint256[] memory productIds = farmerProducts[msg.sender];
        uint256 count = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (products[productIds[i]].exists) {
                count++;
            }
        }
        Product[] memory userProducts = new Product[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < productIds.length; i++) {
            if (products[productIds[i]].exists) {
                userProducts[index] = products[productIds[i]];
                index++;
            }
        }
        return userProducts;
    }

    function updateProductDetail(
        uint256 _id,
        string memory _status
    ) internal {
        Product storage product = products[_id];
        //product.status = _status;
    }

    function getBuyHistory(uint256 productId) public view returns (History[] memory) {
        return productHistory[productId];
    }

    function fetchAllProducts() public view returns (Product[] memory) {
        uint totalProducts = productCount;
        uint activeProductCount = 0;

        for (uint i = 1; i <= totalProducts; i++) {
            if (products[i].exists && products[i].quantity > 0 && keccak256(bytes(products[i].ownerRole)) == keccak256(bytes("farmer"))) {
                activeProductCount++;
            }
        }

        Product[] memory activeProducts = new Product[](activeProductCount);
        uint j = 0;

        for (uint i = 1; i <= totalProducts; i++) {
            if (products[i].exists && products[i].quantity > 0 && keccak256(bytes(products[i].ownerRole)) == keccak256(bytes("farmer"))) {
                activeProducts[j] = products[i];
                j++;
            }
        }

        console.log("Fetching all products from farmers, total count: %s, active count: %s", totalProducts, activeProductCount);
        return activeProducts;
    }

    function buyProductFromFarmer(uint256 productId, uint256 quantity, string memory role) public {
    Product storage product = products[productId];
    require(product.exists, "Product does not exist.");
    require(product.quantity >= quantity, "Insufficient product stock.");
    require(quantity > 0, "Quantity must be greater than zero.");

    product.quantity -= quantity;
    bool productAdded = false;

    if (keccak256(bytes(role)) == keccak256(bytes("distributor")) ||
        keccak256(bytes(role)) == keccak256(bytes("wholesaler")) ||
        keccak256(bytes(role)) == keccak256(bytes("retailer")) ||
        keccak256(bytes(role)) == keccak256(bytes("consumer"))) {
        uint256[] storage roleProducts = distributorProducts[msg.sender];
        if (keccak256(bytes(role)) == keccak256(bytes("wholesaler"))) {
            roleProducts = wholesalerProducts[msg.sender];
        } else if (keccak256(bytes(role)) == keccak256(bytes("retailer"))) {
            roleProducts = retailerProducts[msg.sender];
        } else if (keccak256(bytes(role)) == keccak256(bytes("consumer"))) {
            roleProducts = consumerProducts[msg.sender];
        }

        for (uint i = 0; i < roleProducts.length; i++) {
            Product storage distProduct = products[roleProducts[i]];
            if (keccak256(bytes(distProduct.name)) == keccak256(bytes(product.name)) && distProduct.ownerID == msg.sender) {
                distProduct.quantity += quantity;
                productAdded = true;
                break;
            }
        }

        if (!productAdded) {
            productCount++;
            products[productCount] = Product(
                productCount,
                product.name,
                product.price,
                quantity,
                product.category,
                msg.sender,
                role,
                product.imageHash, // imageHash
                toString(productId),
                true
            );
            roleProducts.push(productCount);
        }
    }

    // Check if there is already a history entry for the current buyer and role
    bool historyUpdated = false;
    for (uint i = 0; i < productHistory[productId].length; i++) {
        if (productHistory[productId][i].buyer == msg.sender && keccak256(bytes(productHistory[productId][i].role)) == keccak256(bytes(role))) {
            productHistory[productId][i].timestamp = block.timestamp;
            historyUpdated = true;
            break;
        }
    }

    // If no existing entry was found, add a new history entry
    if (!historyUpdated) {
        productHistory[productId].push(History({
            buyer: msg.sender,
            role: role,
            timestamp: block.timestamp,
            mainProductId: productCount,
            referenceProductId: productId
        }));
    }

    emit ProductBought(productId, msg.sender, role);

    salesCount += 1;
    emit ProductPurchasedFromFarmer(productId, msg.sender, role);
}


    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }


 function traceAndTrack(uint256 productId) public view returns (History[] memory) {
    require(products[productId].exists, "Product does not exist");

    uint256 totalHistoryCount = countRelevantHistories(productId);

    console.log("Total history count: %s", totalHistoryCount);

    // Initialize an array to store all relevant history entries
    History[] memory allHistories = new History[](totalHistoryCount);
    uint256 index = 0;

    gatherHistories(productId, allHistories, index);

    return allHistories;
}

// Helper function to count relevant histories
function countRelevantHistories(uint256 productId) internal view returns (uint256) {
    uint256 totalHistoryCount = 0;

    for (uint256 i = 1; i <= productCount; i++) {
        for (uint256 j = 0; j < productHistory[i].length; j++) {
            if (productHistory[i][j].mainProductId == productId) {
                totalHistoryCount++;
                totalHistoryCount += countReferenceHistories(productHistory[i][j].referenceProductId);
            }
        }
    }

    return totalHistoryCount;
}

// Helper function to count reference histories recursively
function countReferenceHistories(uint256 referenceProductId) internal view returns (uint256) {
    uint256 count = 0;

    for (uint256 i = 1; i <= productCount; i++) {
        for (uint256 j = 0; j < productHistory[i].length; j++) {
            if (productHistory[i][j].mainProductId == referenceProductId) {
                count++;
                count += countReferenceHistories(productHistory[i][j].referenceProductId);
            }
        }
    }

    return count;
}

// Helper function to gather relevant histories
function gatherHistories(uint256 productId, History[] memory allHistories, uint256 index) internal view returns (uint256) {
    for (uint256 i = 1; i <= productCount; i++) {
        for (uint256 j = 0; j < productHistory[i].length; j++) {
            if (productHistory[i][j].mainProductId == productId) {
                allHistories[index] = productHistory[i][j];
                index++;
                index = gatherReferenceHistories(productHistory[i][j].referenceProductId, allHistories, index);
            }
        }
    }

    return index;
}

// Helper function to gather reference histories recursively
function gatherReferenceHistories(uint256 referenceProductId, History[] memory allHistories, uint256 index) internal view returns (uint256) {
    for (uint256 i = 1; i <= productCount; i++) {
        for (uint256 j = 0; j < productHistory[i].length; j++) {
            if (productHistory[i][j].mainProductId == referenceProductId) {
                allHistories[index] = productHistory[i][j];
                index++;
                index = gatherReferenceHistories(productHistory[i][j].referenceProductId, allHistories, index);
            }
        }
    }

    return index;
}

function getDistributorProductsForWholesaler() public view returns (Product[] memory) {
        uint totalProducts = productCount;
        Product[] memory allProducts2 = new Product[](totalProducts);
        console.log("Fetching all products, total count: %s", totalProducts);
        for (uint i = 1; i <= totalProducts; i++) {
            if (products[i].exists && keccak256(bytes(products[i].ownerRole)) == keccak256(bytes("distributor"))) {
                allProducts2[i-1] = products[i];
            }
        }
        return allProducts2;
    }
    function getWholesalerProductsForRetailer() public view returns (Product[] memory) {
        uint totalProducts = productCount;
        Product[] memory allProducts3 = new Product[](totalProducts);
        console.log("Fetching all products, total count: %s", totalProducts);
        for (uint i = 1; i <= totalProducts; i++) {
            if (products[i].exists && keccak256(bytes(products[i].ownerRole)) == keccak256(bytes("wholesaler"))) {
                allProducts3[i-1] = products[i];
            }
        }
        return allProducts3;
    }
    function getRetailerProductsForConsumer() public view returns (Product[] memory) {
        uint totalProducts = productCount;
        Product[] memory allProducts4 = new Product[](totalProducts);
        console.log("Fetching all products, total count: %s", totalProducts);
        for (uint i = 1; i <= totalProducts; i++) {
            if (products[i].exists && keccak256(bytes(products[i].ownerRole)) == keccak256(bytes("retailer"))) {
                allProducts4[i-1] = products[i];
            }
        }
        return allProducts4;
    }
}
