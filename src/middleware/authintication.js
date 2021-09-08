const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
    //jwt.decode()
};

// const isAuth = (req, res, next) => {
//     const { authorization } = req.headers;
//     try {
//         const token = authorization.split(' ')[1];
//         if (token) {
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);
//             const { id } = decoded;
//             req.id = id;
//             next();
//         } else {
//             res.status(401).json({
//                 message: "Unauthorized"
//             })
//             next();
//         }

//     } catch {
//         next("Authorization Failure")
//     }
// }

// module.exports = isAuth;