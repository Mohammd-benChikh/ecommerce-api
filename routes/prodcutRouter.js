import express from 'express';
import productController from './../controllers/productController.js';
const router = new express.Router();

router.get('/',productController.getProducts);


export default router;