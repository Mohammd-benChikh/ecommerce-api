import { Router } from "express";
import { body } from 'express-validator';
import Category from "../../models/Category.js";
import SubCategory from "../../models/SubCategory.js";
import { isObjectExists, isObjectId } from './../../utils/customValidation.js';
import adminProductsController from "../../controllers/admin/adminProductsController.js";
const router = new Router();

router.get('/', adminProductsController.getProducts);


router.post('/',
    body('name').notEmpty().withMessage('The Product name is required.').isString().withMessage('The product name must a string.'),
    body('description').notEmpty().withMessage('The Product description is required.').isString().withMessage('The product description must a string.'),
    body('price').notEmpty().withMessage('The Product price is required.').isNumeric().withMessage('The product price must a number.'),
    body('stock').optional({ checkFalsy: true }).isNumeric().withMessage('The product stock must a number.'),
    body('category').optional({ checkFalsy: true })
    .custom(val => isObjectId(val, "The category id is invalid"))
    .custom(id => isObjectExists(Category, { _id: id }, "The category doesn't exists."))
    .isString().withMessage('The product details must a string.'),
    body('subcategory').optional({ checkFalsy: true })
    .custom(val => isObjectId(val, "The sub category id is invalid"))
    .custom(id => isObjectExists(SubCategory, { _id: id }, "The sub category doesn't exists."))
    .isString().withMessage('The category id must a string.'),
    body('details').optional({ checkFalsy: true })
    .isString().withMessage('The sub category id must a string.').trim().escape(),
    body('images').notEmpty().withMessage('The product images is requried.').isArray({min:1}).withMessage('The product images must an array.'),
    body('tags').optional({ checkFalsy: true }).isArray().withMessage('The product tags must an array.'),
    body('category').optional({ checkFalsy: true }).isString().withMessage('The product category must a number.'),
    body('subcategory').optional({ checkFalsy: true }).isString().withMessage('The product subcategory must a number.'),
    body('status').notEmpty().isIn(['PUBLISHED', 'DRAFT']).withMessage('The product status must PUBLISHED or DRAFT.'),
    adminProductsController.createNewProduct);



router.get('/:id', adminProductsController.getSingleProduct);
router.patch('/:id', adminProductsController.updateProduct);
router.delete('/:id', adminProductsController.deleteProduct);

export default router;