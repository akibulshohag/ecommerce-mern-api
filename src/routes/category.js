const express = require('express')
const router = express.Router();
const { addCategory, getCategories } = require('../controller/category')
const { isAuth, adminMiddleware } = require('../middleware/authintication')

router.post('/category/createCategory',
    isAuth,
    adminMiddleware,

    addCategory)
router.get('/category/getCategory', getCategories)




module.exports = router