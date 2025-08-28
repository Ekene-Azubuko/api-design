import {Router} from 'express';
import {body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';

const router = Router();

/**
 * Product routes
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.post('/product', body('name').isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update routes
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put('/update/:id', 
    body('title').optional(),  
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(), 
    handleInputErrors, 
    updateUpdate
);
router.post('/update', 
    body('title').exists().isString(), 
    body('body').exists().isString(), 
    body('productId').exists().isString(), 
    handleInputErrors, 
    createUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point routes
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', 
    body('description').optional().isString(), 
    body('name').isString(), 
    handleInputErrors, 
    (req, res) => {}
);
router.post('/updatepoint', 
    body('description').isString(), 
    body('name').isString(), 
    body('updateId').exists().isString(), 
    handleInputErrors, 
    (req, res) => {}
);
router.delete('/updatepoint/:id', () => {});

router.use((err,req,res,next) => {
    console.log(err);
    res.json({message: 'in a router'})
})
    


export default router;