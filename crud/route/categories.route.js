const express = require('express');
const router = express.Router();
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller.js');

// get all categories
router.get('/', getCategories);

// get a category
router.get("/:id", getCategory);

// create a category
router.post("/", createCategory);

// update a category
router.put("/:id", updateCategory);

// delete a category
router.delete("/:id", deleteCategory);

module.exports = router;
