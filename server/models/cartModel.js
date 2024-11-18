import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    userid:String,ref:"users",
    name: String,
    description: String,
    price: Number,
    images:  [String], // Change 'image' to 'images' and make it an array of strings,
    category: String,
    available:String,
    quantity:Number,
    brand: String,
    countInStock: Number,
    rating: Number,
    numReviews: Number

}, {timestamps:true})

export default mongoose.model('cart', cartSchema)