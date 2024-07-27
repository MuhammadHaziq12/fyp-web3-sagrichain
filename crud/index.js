const express = require('express');
const mongoose = require('mongoose');
const productRoute = require("./route/product.route.js");
const authRoutes = require('./route/users.route.js');
const catgeoryRoutes = require('./route/categories.route.js');
const orderRoutes = require('./route/order.route.js');
const carouselRouter = require('./route/carousel.route.js');
const multer = require('multer'); // Import multer
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads')); // Serve uploaded images

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // Limit file size to 5MB
  }
});

// Routes
app.use("/api/products",upload.single('image'),productRoute); // Use multer middleware for handling file uploads
app.use("/api/users", authRoutes);
app.use("/api/category",catgeoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/carousel",upload.single('image'),carouselRouter);

app.get('/', (req, res) => {
  res.send("hello from node API server");
});


// // Middleware
// app.use(cors({
//   origin: 'sagrihain-server.vercel.app', // Replace with your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
//   credentials: true
// }));

mongoose.connect("mongodb://127.0.0.1:27017/Sagrichain")
  .then(() => {
    console.log("Connected to database!");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
});
