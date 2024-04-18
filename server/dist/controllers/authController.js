"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticated = exports.authLogout = exports.authLogin = exports.authRegister = void 0;
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRegister = async (req, res) => {
    try {
        const { user_name, email, password } = req.body;
        const [existingUser] = await db_1.default
            .promise()
            .query("SELECT * FROM User WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const [newUser] = await db_1.default
            .promise()
            .query("INSERT INTO User (user_name , email, password) VALUES (?, ?, ?)", [user_name, email, password]);
        res
            .status(201)
            .json({ message: "User registration successful", user: newUser });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.authRegister = authRegister;
const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [user] = await db_1.default
            .promise()
            .query("SELECT * FROM User WHERE email = ? AND password = ?", [
            email,
            password,
        ]);
        if (!user.length) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        // generating token
        const token = jsonwebtoken_1.default.sign({ user_id: user[0].user_id }, "secret-key", {
            expiresIn: "1h",
        });
        // setting cookie
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Login Successful!", user: user[0] });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.authLogin = authLogin;
const authLogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ messge: "Logout succsessful!" });
};
exports.authLogout = authLogout;
const authenticated = (req, res) => {
    res.status(200).json({ user: req.user_id });
};
exports.authenticated = authenticated;
