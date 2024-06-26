import jwt from "jsonwebtoken"





const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ success: false, message: "Not authorized, please login again" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, please login again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Authorization error" });
    }

    
};

export default authMiddleware;
