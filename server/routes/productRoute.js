import express from 'express'
import { Product, allProducts, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js'
import upload from '../multerConfig.js';
// import { requireSignIn } from '../middlewares/userMiddleware.js';


const router = express.Router()

router.get('/allproducts',   allProducts);
router.get('/product/:id', Product);
router.post('/createproduct', upload.array('images', 5), createProduct);
router.put('/update/:id', upload.array('images'), updateProduct);

router.delete('/deleteproduct/:id', deleteProduct);

export default router;
