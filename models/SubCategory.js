import mongoose from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2';

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        select:false
    }],
    productsCount:{
        type:Number,
        default:0,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:true
    }
}, { timestamps: true });


subCategorySchema.plugin(mongoosePagination);

const SubCategory = mongoose.model('subcategory', subCategorySchema);
export default SubCategory;