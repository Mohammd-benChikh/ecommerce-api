import mongoose from "mongoose";

const addessSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    postalCode: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Address = mongoose.model('address', addessSchema);
export default Address;