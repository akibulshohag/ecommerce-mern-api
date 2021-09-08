const { check, validationResult } = require('express-validator');

exports.signupValidate = [
    check('firstName')
        .notEmpty()
        .withMessage('firstName is required')
        .isLength({ min: 2, max: 15 })
        .withMessage('Firstname must be between 2 to 15'),
    check('lastName')
        .notEmpty()
        .withMessage('lastName is required')
        .isLength({ min: 2, max: 15 })
        .withMessage('lastname must be between 2 to 15'),
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.signinValidate = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.authValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}