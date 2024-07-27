const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CarouselSchema = mongoose.Schema(
    {
        CarouselID: {
            type: Number,
            unique: true
        },
        CarouselName: {
            type: String,
   //         required: [true, "Please enter Carousel name"]
        },
        // Updated image field to store image as Buffer data along with content type
        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

CarouselSchema.plugin(AutoIncrement, { inc_field: 'CarouselID' });

const Carousel = mongoose.model("Carousel", CarouselSchema);

module.exports = Carousel;
