import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true,
    },
    billingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    quntity: {
        type: Number,
        required: false,
        default: 1
    },
    tax: {
        type: Number,
        required: false,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: false,
        default: 0.0
    },
    status: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);
export default Order;