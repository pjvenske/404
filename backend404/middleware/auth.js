const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.headers["authorization"];

    if (!token)
        return res.status(401).json({ message: "Access denied. No token provided." });

    jwt.verify(token.split(" ")[1], "SECRETKEY", (err, decoded) => {
        if (err) return res.status(400).json({ message: "Invalid token." });

        req.user = decoded;
        next();
    });
};
