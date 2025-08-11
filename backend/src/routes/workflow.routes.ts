import { Router } from "express";
import { auth } from "../middlewares/auth";
import workflowController from "../controllers/workflow.controller";

const router = Router();

router.post("/", auth, workflowController.createWorkflow);
router.get("/:flowId", auth, workflowController.getWorkFlow);
router.post("/:flowId", auth, workflowController.updateWorkflow);
router.get("/", auth, workflowController.getAllWorkflow);

export default router;
