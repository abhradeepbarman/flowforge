import { Router } from "express";
import { auth } from "../middlewares/auth";
import workflowController from "../controllers/workflow.controller";

const router = Router();

router.post("/", auth, workflowController.createWorkflow);
router.post("/:id", auth, workflowController.updateWorkflow);
router.get("/:id", auth, workflowController.getWorkFlow);
router.get("/", auth, workflowController.getAllWorkflow);

export default router;
