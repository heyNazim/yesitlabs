import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [String], // Array of strings for multiple images
    category: { type: String, required: true },
    available: { type: String },
    quantity: { type: Number, default: 0 }, // Default quantity is 0
    brand: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, default: 0 }, // Default rating is 0
    numReviews: { type: Number, default: 0 } // Default number of reviews is 0
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
