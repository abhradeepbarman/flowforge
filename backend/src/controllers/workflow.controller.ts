import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { workflows } from "../db/schema";
import CustomErrorHandler from "../utils/CustomErrorHandler";
import ResponseHandler from "../utils/ResponseHandler";
import { workflowStatus } from "@/constants";

const workflowController = {
    async createWorkflow(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;
            const { id } = req.user;

            const newWorkflow = await db
                .insert(workflows)
                .values({
                    name: body?.name || "Untitled Workflow",
                    userId: id,
                    status: workflowStatus.INCOMPLETE,
                })
                .returning();

            return res.status(201).send(
                ResponseHandler(201, "Workflow created", {
                    id: newWorkflow[0].id,
                    name: newWorkflow[0].name,
                }),
            );
        } catch (error) {
            return next(error);
        }
    },

    async getWorkFlow(req: Request, res: Response, next: NextFunction) {
        try {
            const { flowId } = req.params;
            const { id } = req.user;

            const workflow = await db.query.workflows.findFirst({
                where: and(eq(workflows.id, flowId), eq(workflows.userId, id)),
                with: {
                    steps: true,
                },
            });

            if (!workflow) {
                return next(CustomErrorHandler.notFound("Workflow not found"));
            }

            return res
                .status(200)
                .send(ResponseHandler(200, "Workflow found", workflow));
        } catch (error) {
            return next(error);
        }
    },

    async updateWorkflow(req: Request, res: Response, next: NextFunction) {
        try {
            const { flowId } = req.params;
            const body = req.body;

            if (!body?.name) {
                return next(CustomErrorHandler.BadRequest("Name is required"));
            }

            const updatedWorkflow = await db
                .update(workflows)
                .set({
                    name: body?.name,
                })
                .where(eq(workflows.id, flowId))
                .returning();

            return res.status(200).send(
                ResponseHandler(200, "Workflow updated", {
                    id: updatedWorkflow[0].id,
                    name: updatedWorkflow[0].name,
                }),
            );
        } catch (error) {
            return next(error);
        }
    },

    async getAllWorkflow(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.user;

            const allWorkflows = await db.query.workflows.findMany({
                where: eq(workflows.userId, id),
            });

            return res
                .status(200)
                .send(ResponseHandler(200, "Workflows found", allWorkflows));
        } catch (error) {
            return next(error);
        }
    },
};

export default workflowController;
