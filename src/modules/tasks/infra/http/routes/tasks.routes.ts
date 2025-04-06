import { Router } from "express";

import TasksController from "../controllers/tasks.controller";

const tasksRouter = Router();

const tasksController = new TasksController();

tasksRouter.post("/", tasksController.create);

tasksRouter.get("/", tasksController.index);

tasksRouter.get("/:id", tasksController.show);

tasksRouter.patch("/:id", tasksController.update);

tasksRouter.delete("/:id", tasksController.delete);

export default tasksRouter;
