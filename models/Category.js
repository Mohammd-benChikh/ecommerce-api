import mongoose from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2';

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    cover:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false,
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        select:false
    }],
    productsCount:{
        type:Number,
        default:0,
    },
    subCategoriesCount:{
        type:Number,
        default:0,
    },
    subCategories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategory',
        select:false
    }],
},{timestamps:true});

categorySchema.plugin(mongoosePagination);

const Category = mongoose.model('category',categorySchema);
export default Category;