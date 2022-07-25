import Product from './../../models/Product.js';
import Category from './../../models/Category.js';
import SubCategory from './../../models/SubCategory.js';
import { validationResult } from 'express-validator';
import { validObjectId } from './../../utils/functions.js'


const checkSubCategoryIsBelongsToParent = (categoryId, subcategoryId) => {
    return SubCategory.findOne({ _id: subcategoryId, parent: categoryId })
        .then((category) => {
            if (category) {
                return true;
            }
            return false;
        })
        .catch(error => {
            throw error;
        });
}

const getParentCategory = (subcategoryId) => {
    return SubCategory.findById(subcategoryId)
        .then(subcategory => {
            return subcategory.parent;
        }).catch(error => {
            throw error;
        });
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


const createNewProduct = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const data = req.body;
        let categoryId = req.body.category;
        let subcategoryId = req.body.subcategory;
        const checkSubcategory = await checkSubCategoryIsBelongsToParent(categoryId, subcategoryId);

        if (categoryId && subcategoryId && !checkSubcategory) {
            return res.status(400).send("The subcategory doesn't belongs to selected category");
        }

        if (!categoryId && subcategoryId) {
            categoryId = await getParentCategory(subcategoryId);
            data.category = categoryId;
        }

        data.thumbnail = data.thumbnail ?? data.images[0];
        const product = await Product.create(data);
        await Category.findByIdAndUpdate(categoryId, { $push: { products: product._id }, $inc: { productsCount: 1 } });
        await SubCategory.findByIdAndUpdate(subcategoryId, { $push: { products: product._id }, $inc: { productsCount: 1 } });
        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const product = await Product.findById(id);
        if (!product) return res.sendStatus(404);
        return res.json(product);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const id = validObjectId(req.params.id);
        const data = req.body;
        let categoryId = req.body.category;
        let subcategoryId = req.body.subcategory;
        const checkSubcategory = await checkSubCategoryIsBelongsToParent(categoryId, subcategoryId);

        if (categoryId && subcategoryId && !checkSubcategory) {
            return res.status(400).send("The subcategory doesn't belongs to selected category");
        }

        if (!categoryId && subcategoryId) {
            categoryId = await getParentCategory(subcategoryId);
            data.category = categoryId;
        }

        data.thumbnail = data.thumbnail ?? data.images[0];

        const product = await Product.findById(id);

        await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id }, $inc: { productsCount: -1 } });
        await SubCategory.findByIdAndUpdate(product.subcategory, { $pull: { products: product._id }, $inc: { productsCount: -1 } });

        await product.update(id);

        await Category.findByIdAndUpdate(categoryId, { $push: { products: product._id }, $inc: { productsCount: 1 } });
        await SubCategory.findByIdAndUpdate(subcategoryId, { $push: { products: product._id }, $inc: { productsCount: 1 } });
        return res.statsu(200).json(product);

    } catch (error) {
        return res.status(400).send(error.message);
    }
}


const deleteProduct = async (req, res) => {
    try {
        const id = validObjectI(req.params.id);
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.sendStatus(404);
        await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id }, $inc: { productsCount: -1 } });
        await SubCategory.findByIdAndUpdate(product.subcategory, { $pull: { products: product._id }, $inc: { productsCount: -1 } });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export default { getProducts, createNewProduct, getSingleProduct, updateProduct, deleteProduct }