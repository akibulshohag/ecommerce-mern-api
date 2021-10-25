const express = require('express')
const router = express.Router();
const { addProduct, getAllProduct,getProductsBySlug } = require('../controller/product')
const { isAuth, adminMiddleware } = require('../middleware/authintication')
const path = require('path')
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now());
    },
})

const upload = multer({ storage })

router.post('/product/createProduct',
    isAuth,
    adminMiddleware,
    upload.array('images'),

    addProduct)

router.get('/products/:slug',getProductsBySlug)    
router.get('/product/getAllProduct', isAuth, adminMiddleware, getAllProduct)




module.exports = router