const express = require('express')
const router = express.Router();
const { initialData} = require('../controller/initialData')


router.post('/initialData', initialData)
// router.get('/cart/getCart', isAuth, getCart)




module.exports = router