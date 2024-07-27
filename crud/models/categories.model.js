const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategorySchema = mongoose.Schema(
    {
      id: {
        type: Number,
        unique: true, // Ensure unique constraint
      },
      CategoryName: {
        type: String,
        required: [true, "Please enter category name"],
      },
    },
    {
      timestamps: true,
    }
  );
  

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
