import { Router } from "express";
import adminCategoriesController from "../../controllers/admin/adminCategoriesController.js";
import { body } from "express-validator";

const router = new Router();

router.post('/',
    body('name').notEmpty().withMessage('The category name is required').isString().withMessage('The category name must be a string'),
    body('cover').optional({ checkFalsy: true }).isURL().withMessage('The category cover is invalid image url'),
    body('description').optional({ checkFalsy: true }).isString().withMessage('The category description must be a string'),
    adminCategoriesController.createNewCategory);

router.get('/', adminCategoriesController.getCategories);
router.get('/:id', adminCategoriesController.getSingleCategory);
router.get('/:id/subcategories', adminCategoriesController.getSubCategories);

router.patch('/:id',
    body('name').notEmpty().withMessage('The category name is required').isString().withMessage('The category name must be a string'),
    body('cover').optional({ checkFalsy: true }).isURL().withMessage('The category cover is invalid image url'),
    body('description').optional({ checkFalsy: true }).isString().withMessage('The category description must be a string'),
    adminCategoriesController.updateCategory);

router.delete('/:id',adminCategoriesController.deleteCategory);
export default router;