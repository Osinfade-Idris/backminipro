const express = require('express')
const router = express.Router();
const {
    getProducts,
    getSingleProduct,
    createProduct,
    editProduct,
    deleteProduct
} = require('../controllers/products')

// router.get('/',getProducts);
// router.post('/',createProduct);
// router.get('/q',getSingleProduct); 
// router.put('/:id',editProduct)
// router.delete('/:id',deleteProduct)

//can use chaining open instead too
router.route('/').get(getProducts).post(createProduct);
router.route('/:id').put(editProduct).delete(deleteProduct);
router.route('/q').get(getSingleProduct);


module.exports = router