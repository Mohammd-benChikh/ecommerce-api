import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        required: false,
        type: Number,
        default: 0
    },
    comment: {
        required: true,
        type: String
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }
}, { timestamps: true });

const Review = mongoose.model('review', reviewSchema);
export default Review;