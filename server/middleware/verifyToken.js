import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/userSchema.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

export default verifyToken;