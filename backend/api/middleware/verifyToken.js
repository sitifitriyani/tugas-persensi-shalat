// middleware/verifyToken.js

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};
