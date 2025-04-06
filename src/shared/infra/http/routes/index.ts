import { Router } from "express";

import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import tasksRouter from "@modules/tasks/infra/http/routes/tasks.routes";

const routes = Router();

routes.use("/session", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/tasks", tasksRouter);

export default routes;
