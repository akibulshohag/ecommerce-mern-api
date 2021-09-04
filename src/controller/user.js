const User = require('../model/User')

const jwt = require('jsonwebtoken')




exports.userSignup = async (req, res, next) => {
    try {
        let { firstName, lastName, email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                success: "User already exit"
            })
        } else {
            let user = new User({
                firstName,
                lastName,
                userName: Math.random().toString(),
                email,
                password
            })
            let result = await user.save()
            res.status(200).json({
                data: result,
                success: "User singup successfully"
            })
        }

    } catch (err) {
        console.log('error===', err)
    }
}

exports.userLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (user) {
            const { _id, firstName, lastName, email, role, fullName } = user;
            let isvalidPassword = user.authinticate(password)
            if (isvalidPassword) {
                let token = jwt.sign({
                    id: user._id
                },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: '12h'
                    })
                res.status(200).json({
                    access_token: token,
                    success: "Login successfully",
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName,
                    id: _id
                })
            } else {
                res.status(401).json({
                    message: "Authintication failed"
                })
            }
        } else {
            res.status(401).json({
                message: "Authintication failed"
            })
        }
        // let result = await user.save()
        res.status(200).json({
            data: result,
            success: "Created"
        })
    } catch (err) {
        console.log('error===', err)
    }
}

exports.getAllUser = async (req, res, next) => {
    try {

        res.status(200).json({
            data: 'hi',
        })
    } catch (err) {
        console.log('error===', err)
    }
}