import { Router } from "express";
import {
  authRegister,
  authLogin,
  authLogout,
  authenticated,
} from "../controllers/authController";
import verifyToken from "../middleware/authMiddleware";

const router = Router();

router.post("/register", authRegister);
router.post("/login", authLogin);
router.post("/logout", authLogout);
router.get("/auth", verifyToken, authenticated);

export default router;
