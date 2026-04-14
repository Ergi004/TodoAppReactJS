"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearerToken = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))
        ? authHeader.slice(7)
        : undefined;
    const token = req.cookies.token || bearerToken;
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "secret-key");
        req.user = { user_id: decoded.user_id };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.default = verifyToken;
