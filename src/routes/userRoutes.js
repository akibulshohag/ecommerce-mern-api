const router = require('express').Router()
const {
    userSignup, getAllUser, userLogin
} = require('../controller/user')

router.post('/signup', userSignup)

router.post('/login', userLogin)



router.get('/all', getAllUser)

module.exports = router