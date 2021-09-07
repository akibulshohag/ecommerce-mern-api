const { body, check,validationResult } = require('express-validator')

exports.signinValidate = [
    check('email')
    .isEmail()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
];

exports.isLoginRequestValidated=(req,res,next)=>{
    const errors = validationResult(req);
    console.log('=====aaaa',errors);
    if(errors?.length > 0){
        return res.status(400).json({
            error:errors.array()[0].msg
        }) 
    }
    next();
}