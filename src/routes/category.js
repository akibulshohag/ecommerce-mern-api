const express = require('express')
const router = express.Router();
const { addCategory, getCategories } = require('../controller/category')
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

router.post('/category/createCategory',
    isAuth,
    adminMiddleware,
    upload.single('categoryImage'),

    addCategory)
router.get('/category/getAllCategory', getCategories)




module.exports = router