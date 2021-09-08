const express = require('express')
const router = express.Router();
const { addProduct, getAllProduct } = require('../controller/product')
const { isAuth, adminMiddleware } = require('../middleware/authintication')

router.post('/product/createProduct',
    isAuth,
    adminMiddleware,

    addProduct)
router.get('/product/getAllProduct',isAuth, adminMiddleware, getAllProduct)




module.exports = router