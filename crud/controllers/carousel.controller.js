// controllers/category.controller.js
// const { Carousel } = require('bootstrap');
const Carousel = require('../models/carousel.model');

const getCarousel = async (req, res) => {
    try {
        const carousel = await Carousel.find();
        res.status(200).json(carousel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createCarousel = async (req, res) => {
    
    console.log('Request body:', req.body); // Log the request body
    console.log('Uploaded file:', req.file); // Log the uploaded file
    
    try {
        
        const { CarouselName } = req.body;
                  // Get the file path of the uploaded image
        const image = req.file ? req.file.originalname : '';
        

 // Create a new product document
 const carousel = await Carousel.create({
    CarouselName,
    image,
  });
        // Send the created product as response
      res.status(201).json(carousel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getCarousel,
    createCarousel
}    

