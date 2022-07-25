import SubCategory from "../../models/SubCategory.js";
import Category from "../../models/Category.js";
import { validationResult } from "express-validator";
import { paginationQuery, validObjectId } from '../../utils/functions.js';

const getSubCategories = async (req, res) => {
    try {
        const { page, limit, sortBy, sortDir } = paginationQuery(req.query);
        const sort = {};
        sort[sortBy] = sortDir;
        const categories = await SubCategory.paginate({}, { page, limit, sort,populate:'parent' });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const createNewSubCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        const { name, description, parent } = req.body;
        const subCategory = await SubCategory.create({ name, description, parent });
        await Category.findByIdAndUpdate(parent, { $push: { subCategories: subCategory._id }, $inc: { subCategoriesCount: 1 } });
        return res.status(201).json(subCategory);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getSingleSubCategory = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const subcategory = await SubCategory.findById(id);
        if (!subcategory) return res.sendStatus(404);
        return res.json(subcategory);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const id = validObjectId(req.params.id);
        const subCategory = await SubCategory.findOne({ _id: id });
        if (!subCategory) return res.sendStatus(404);

        const { name, parent, description } = req.body;
        await Category.findByIdAndUpdate(subCategory.parent, { $pull: { subCategories: subCategory._id }, $inc: { subCategoriesCount: -1 } });
        await subCategory.update({ name, parent, description });
        await Category.findByIdAndUpdate(parent, { $push: { subCategories: subCategory._id }, $inc: { subCategoriesCount: 1 } });
        return res.json(subCategory);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const subcategory = await SubCategory.findByIdAndDelete(id);
        if (!subcategory) return res.sendStatus(404);
        await Category.findByIdAndUpdate(subcategory.parent, { $pull: { subCategories: subcategory._id }, $inc: { subCategoriesCount: -1 } });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


export default { createNewSubCategory, getSubCategories, getSingleSubCategory, updateSubCategory, deleteSubCategory }