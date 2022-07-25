import { Router } from "express";
import authRouter from './authRouter.js';
import adminProductsRouter from './adminProductsRouter.js';
import adminCategoriesRouter from './adminCategoriesRouter.js';
import adminSubCategoriesRouter from './adminSubCategoriesRouter.js';

const router = new Router();

router.use('/',authRouter);
router.use('/products',adminProductsRouter);
router.use('/categories',adminCategoriesRouter);
router.use('/subcategories',adminSubCategoriesRouter);

export default router;