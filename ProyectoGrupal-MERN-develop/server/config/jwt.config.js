const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {
    jwt
        .verify(req.cookies.usertoken, secret_key, (err, payload) => {
            if (err) {
                res.status(401).json({ verified: false });
            } else {
                next();
            }
        });
}