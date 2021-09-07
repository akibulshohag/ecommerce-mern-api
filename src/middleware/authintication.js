const jwt = require('jsonwebtoken')

exports.isAuth = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const { id, role } = decoded;
            req.id = id;
            req.role = role;
            // next();
        } else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
        next();
    } catch {
        next("Authorization Failure")
    }
    // next()
}

exports.userAuth = async (req, res, next) => {
    if (req.role !== 'user') {
        res.status(401).json({
            access_error: "User access denied"
        })

    }
}

exports.adminAuth = async (req, res, next) => {
    if (req.role !== 'admin') {
        res.status(401).json({
            access_error: "Admin access denied"
        })
    }
    next()
}
