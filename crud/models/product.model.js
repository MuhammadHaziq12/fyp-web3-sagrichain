const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        category: {
            type: String,
            required: [true, "Please enter product category"]
        },
        userID: {
            type: String,
            required: true
        },
        farmerStatus: {
            type: String,
            default: 'unsold' // Default value set to 'unsold'
        },
        distributorStatus: {
            type: String,
            default: 'unsold' // Default value set to 'unsold'
        },
        wholesalerStatus: {
            type: String,
            default: 'unsold' // Default value set to 'unsold'
        },
        retailerStatus: {
            type: String,
            default: 'unsold' // Default value set to 'unsold'
        },
        qrCodeUrl: {
            type: String // URL pointing to the QR code image
        },
        // Updated image field to store image as Buffer data along with content type
        image: {
            type: String
        },
        metaMaskId: {
            type: String,
            required: true // Assuming MetaMask ID is required
        },
        metaMaskUserID: {
            type: String,
            required: true // Assuming MetaMask User ID is required
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;