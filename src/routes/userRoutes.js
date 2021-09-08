const router = require('express').Router()
const {
    userSignup, 
    getAllUser, 
    userLogin,
    adminLogin,
    adminSignup
} = require('../controller/user')

const {isAuth} = require('../middleware/authintication')

const{signupValidate,authValidationResult,signinValidate} = require('../validators/signupValidation')

router.post('/signup',signupValidate,authValidationResult, userSignup)
router.post('/login',signinValidate,authValidationResult, userLogin)
router.get('/allUser', isAuth, getAllUser)

router.post('/adminSignup',signupValidate,authValidationResult, adminSignup)
router.post('/adminLogin',signinValidate,authValidationResult, adminLogin)

module.exports = router