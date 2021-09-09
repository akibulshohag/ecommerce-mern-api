const express = require('express')
const router = express.Router();
const { addToCart, getCategories } = require('../controller/cart')
const { isAuth, userMiddleware } = require('../middleware/authintication')

router.post('/cart/addToCart',
    isAuth,
    userMiddleware,

    addToCart)
// router.get('/cart/getCart', isAuth, getCart)




module.exports = router