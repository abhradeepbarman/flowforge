import { Router } from "express";
import authControllers from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/google", authControllers.googleLogin);
router.get("/google/callback", authControllers.googleLoginCallback);
router.post("/logout", auth, authControllers.logout);

export default router;
