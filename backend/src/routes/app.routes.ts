import { Router } from "express";
import { appController } from "../controllers/app.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, appController.getAllApps);

export default router;
