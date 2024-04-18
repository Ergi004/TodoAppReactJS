import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const verifyToken: RequestHandler = (req: any, res , next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded: any = jwt.verify(token, "secret-key");
    console.log("Decoded token outside middleware:", decoded);
    req.user = {
      user_id: decoded.user_id,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default verifyToken;
