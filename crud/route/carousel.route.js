const express = require('express');
const router = express.Router();
// const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller.js');
const { getCarousel,createCarousel } = require('../controllers/carousel.controller.js');

// get all categories
router.get('/', getCarousel);


// create a category
router.post("/", createCarousel);


module.exports = router;
