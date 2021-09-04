const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const { id } = decoded;
            req.id = id;
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
            next();
        }

    } catch {
        next("Authorization Failure")
    }
}

module.exports = isAuth;