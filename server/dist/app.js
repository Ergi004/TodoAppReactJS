"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const app = (0, express_1.default)();
const PORT = 3005;
const CLIENT_ORIGIN = "http://localhost:3000";
app.use((0, cors_1.default)({
    credentials: true,
    origin: CLIENT_ORIGIN,
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((req, _res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});
app.get("/", (_req, res) => {
    res.json({ message: "Todo API running" });
});
app.get("/protected-route", authMiddleware_1.default, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});
app.use("/auth", authRoutes_1.default);
app.use("/todos", todoRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
db_1.default.connect((err) => {
    if (err) {
        return console.error(`MySQL connection error: ${err.message}`);
    }
    console.log("Connected to the MySQL server");
});
