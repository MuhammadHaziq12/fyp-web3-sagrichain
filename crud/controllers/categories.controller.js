// controllers/category.controller.js
const Category = require('../models/categories.model');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createCategory = async (req, res) => {
    try {
      const { id, CategoryName } = req.body;
  
      // Check if a category with the given id already exists
      const existingCategory = await Category.findOne({ id });
      if (existingCategory) {
        return res.status(400).json({ message: 'Category with this ID already exists' });
      }
  
      // Create a new category
      const newCategory = new Category({ id, CategoryName });
      const category = await newCategory.save();
  
      // Send the created category as response
      res.status(201).json(category);
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  };
  

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { CatID, CategoryName } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { CatID, CategoryName }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
