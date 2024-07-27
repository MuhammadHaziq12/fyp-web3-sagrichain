const Product = require("../models/product.model.js");
// const qr = require("qrcode");
// const fs = require("fs");


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};


const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

// const createProduct = async (req, res) => {
//   //debugger;
//   try {
//     upload(req, res, async (err) => {
//       if (err) {
//         // Handle file upload error
//         return res
//           .status(500)
//           .json({ message: "File upload error", error: err });
//       }

//       // Destructure productName, quantity, price, category from req.body
//       const { productName, quantity, price, category,userID } = req.body;
       
//       // Get the file path of the uploaded image
//      const image = req.file ? req.file.path : ""; // Assuming the file is uploaded successfully
// console.log(image)
//       // Create a new product document
//       const product = await Product.create({
//         productName,
//         quantity,
//         price,
//         category,
//         image,
//         userID, //req.userData._id
//       });

//       //         // Generate QR code
//       // const qrCodePath = path.join(
//       //     __dirname,
//       //     "../../sagrichain/",
//       //     "public",
//       //     "qr_codes",
//       //     ${product._id}.png
//       //   );
//       //   await qr.toFile(qrCodePath, JSON.stringify(productData));

//       //   // Update product with QR code URL
//       //   product.qrCodeUrl = /qr_codes/${product._id}.png;
//       //   await product.save();

//       // Send the created product as response
//       res.status(201).json(product);
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const createProduct = async (req, res) => {
  try {
    // Destructure fields from req.body
    const {
      id,
      name,
      image,
      price,
      price_discount,
      stock,
      draft,
      description,
      status,
      categories
    } = req.body;

    // Create a new product document
    const product = await Product.create({
      id,
      name,
      image,
      price,
      price_discount,
      stock,
      draft,
      description,
      status,
      categories
    });

    // Send the created product as response
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const products = await Product.find({ role: role });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductImageByMetaMaskId = async (req, res) => {
  try {
    const { metaMaskId } = req.params;
    const product = await Product.findOne({ metaMaskId: metaMaskId });

    if (!product || !product.image) {
      return res.status(404).json({ message: 'Product or image not found' });
    }

    // Assuming the image field stores the file path or URL to the image
    res.status(200).json({ imageUrl: product.image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductByMetaMaskId = async (req, res) => {
  try {
    const { metaMaskId } = req.params;
    const product = await Product.findOne({ metaMaskId: metaMaskId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ _id: product._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  getProduct,
  createProduct, // Use multer middleware for file upload
  updateProduct,
  deleteProduct,
  getProductsByRole,
  getProductImageByMetaMaskId,
  getProductByMetaMaskId,
};