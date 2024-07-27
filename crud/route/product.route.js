const express = require('express');
const router = express.Router();
const {getProducts, getProduct, createProduct, getProductsByRole, updateProduct, deleteProduct,getProductImageByMetaMaskId, getProductsByCategory} = require('../controllers/product.controller.js');

// get all products
router.get('/', getProducts);

// get a product
router.get("/:id", getProduct);
router.get("/metamask/:metaMaskId/image", getProductImageByMetaMaskId);
// get products by role
router.get("/role/:role", getProductsByRole);

// create a product
router.post("/", createProduct);

// update a product
router.put("/:id", updateProduct);

// delete a product
router.delete("/:id", deleteProduct);
// app.get('/products/:id/image', getProductImage); // Add endpoint for serving images
// get products by category
// router.get("/category", getProductsByCategory);

module.exports = router;