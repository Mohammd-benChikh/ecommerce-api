import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        required: true,
        type: String,
        minlength: 8,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }],
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address'
    }],
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Admin;