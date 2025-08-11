import { Router } from "express";
import { appController } from "../controllers/app.controller";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, appController.getAllApps);
router.get("/:app/trigger", auth, appController.getAllApps);
router.get("/:app/:trigger/login", auth, appController.appLogin);
router.get("/:app/:trigger/callback", auth, appController.appCallback);

export default router;
