import { RequestHandler } from "express";
import { User } from "../models/models";
import db from "../config/db";
import jwt from "jsonwebtoken";

export const authRegister: RequestHandler = async (req, res) => {
  try {
    const { user_name, email, password }: User = req.body;
    const [existingUser]: any = await db
      .promise()
      .query("SELECT * FROM User WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const [newUser] = await db
      .promise()
      .query(
        "INSERT INTO User (user_name , email, password) VALUES (?, ?, ?)",
        [user_name, email, password]
      );

    res
      .status(201)
      .json({ message: "User registration successful", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const authLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password }: User = req.body;

    const [user]: any = await db
      .promise()
      .query("SELECT * FROM User WHERE email = ? AND password = ?", [
        email,
        password,
      ]);
    if (!user.length) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // generating token
    const token = jwt.sign({ user_id: user[0].user_id }, "secret-key", {
      expiresIn: "1h",
    });
    
    // setting cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login Successful!", user: user[0] });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authLogout: RequestHandler = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ messge: "Logout succsessful!" });
};

export const authenticated: RequestHandler = (req: any, res) => {
  res.status(200).json({ user: req.user_id });
};
