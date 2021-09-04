const router = require('express').Router()
const {
    userSignup, 
    getAllUser, 
    userLogin,
    adminLogin,
    adminSignup
} = require('../controller/user')

const isAuth = require('../middleware/authintication')

router.post('/signup', userSignup)
router.post('/login', userLogin)
router.get('/allUser', isAuth, getAllUser)

router.post('/adminSignup', adminSignup)
router.post('/adminLogin', adminLogin)

module.exports = router