import express from "express";
import connection from "./config/db";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middleware/authMiddleware";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get("/protected-route", verifyToken, (req: any, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
const PORT = 3005;

app.listen(PORT);
connection.connect(function (err: any) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log(`Connected to the MySQL server to port ${PORT}`);
});
