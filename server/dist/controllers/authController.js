"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = exports.authLogout = exports.currentUser = exports.authLogin = exports.authRegister = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const TOKEN_SECRET = "secret-key";
const authRegister = async (req, res) => {
    const { user_name, email, password } = req.body;
    if (!(user_name === null || user_name === void 0 ? void 0 : user_name.trim()) || !(email === null || email === void 0 ? void 0 : email.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const [existingUsers] = await db_1.default.promise().query("SELECT * FROM User WHERE email = ?", [email.trim()]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const [result] = await db_1.default.promise().query("INSERT INTO User (user_name, email, password) VALUES (?, ?, ?)", [user_name.trim(), email.trim(), password.trim()]);
        res.status(201).json({
            message: "User registration successful",
            user: {
                user_id: result.insertId,
                user_name: user_name.trim(),
                email: email.trim(),
            },
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.authRegister = authRegister;
const authLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!(email === null || email === void 0 ? void 0 : email.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const [users] = await db_1.default.promise().query("SELECT * FROM User WHERE email = ? AND password = ?", [email.trim(), password.trim()]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const currentUser = users[0];
        const token = jsonwebtoken_1.default.sign({ user_id: currentUser.user_id }, TOKEN_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                user_id: currentUser.user_id,
                user_name: currentUser.user_name,
                email: currentUser.email,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.authLogin = authLogin;
const currentUser = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const [users] = await db_1.default.promise().query("SELECT user_id, user_name, email, password FROM User WHERE user_id = ?", [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = users[0];
        res.status(200).json({
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.currentUser = currentUser;
const authLogout = async (_req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
};
exports.authLogout = authLogout;
const authenticated = (req, res) => {
    res.status(200).json({ user: req.user });
};
exports.authenticated = authenticated;
