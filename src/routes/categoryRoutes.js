const router = require('express').Router()
const {
    categoryCreateController
} = require('../controller/category')

const {isAuth,adminAuth} = require('../middleware/authintication')

router.post('/createCategory', isAuth, adminAuth, categoryCreateController)
// router.post('/login',signinValidate,isLoginRequestValidated, userLogin)
// router.get('/allUser', isAuth, getAllUser)


module.exports = router