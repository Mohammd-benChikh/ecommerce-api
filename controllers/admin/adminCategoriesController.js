import Category from "../../models/Category.js";
import { validationResult } from "express-validator";
import { paginationQuery,validObjectId } from './../../utils/functions.js';
import SubCategory from "../../models/SubCategory.js";

const getCategories = async (req, res) => {
    try {
        const { page, limit, sortBy, sortDir } = paginationQuery(req.query);
        const sort = {};
        sort[sortBy] = sortDir;
        const categories = await Category.paginate({}, { page, limit, sort });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getSubCategories = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const { page, limit, sortBy, sortDir } = paginationQuery(req.query);
        const sort = {};
        sort[sortBy] = sortDir;
        const categories = await SubCategory.paginate({parent:id}, { page, limit, sort });
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const createNewCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        const { name, cover, description } = req.body;
        const category = await Category.create({ name, cover, description });
        return res.status(201).json(category);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const category = await Category.findById(id);
        if (!category) return res.sendStatus(404);
        return res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
}

const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

        const id = validObjectId(req.params.id);
        const { name, cover, description } = req.body;
        const category = await Category.findByIdAndUpdate(id, { name, cover, description });
        if (!category) return res.sendStatus(404);
        return res.json(category);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = validObjectId(req.params.id);
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}


export default { createNewCategory, getCategories, getSingleCategory,updateCategory,deleteCategory,getSubCategories }