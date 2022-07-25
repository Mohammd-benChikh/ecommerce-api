import { Router } from "express";
import adminSubCategoriesController from "../../controllers/admin/adminSubCategoriesController.js";
import { body } from "express-validator";

const router = new Router();

router.post('/',
    body('name').notEmpty().withMessage('The subcategory name is required').isString().withMessage('The subcategory name must be a string'),
    body('parent').notEmpty().withMessage('The parent category id is required').isString().withMessage('The parent category id parent must be a string'),
    body('description').optional({ checkFalsy: true }).isString().withMessage('The subcategory description must be a string'),
    adminSubCategoriesController.createNewSubCategory);

router.get('/', adminSubCategoriesController.getSubCategories);
router.get('/:id', adminSubCategoriesController.getSingleSubCategory);

router.patch('/:id',
    body('name').notEmpty().withMessage('The subcategory name is required').isString().withMessage('The subcategory name must be a string'),
    body('parent').notEmpty().withMessage('The parent category id is required').isString().withMessage('The parent category id parent must be a string'),
    body('description').optional({ checkFalsy: true }).isString().withMessage('The subcategory description must be a string'),
    adminSubCategoriesController.updateSubCategory);

router.delete('/:id', adminSubCategoriesController.deleteSubCategory);
export default router;