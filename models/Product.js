import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    thumbnail: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String,
    },
    details: {
        required: false,
        type: String,
    },
    images: [String],
    tags: [String],
    price: {
        required: true,
        type: Number
    },
    stock: {
        required: false,
        type: Number,
        default: 0
    },
    rating: {
        required: false,
        type: Number,
        default: 0
    },
    reviewsCount: {
        required: false,
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'category',
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'subcategory',
    },
    status: {
        type: String,
        enum: ['PUBLIESHED', 'DRAFT'],
        default: 'DRAFT',
    }
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);
export default Product;