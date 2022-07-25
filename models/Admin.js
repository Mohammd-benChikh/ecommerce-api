import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    }
},{timestamps:true});

const Admin  = mongoose.model('admin',adminSchema);
export default Admin;