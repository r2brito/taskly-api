import { container } from "tsyringe";

import "@modules/users/providers";

import IUsersRepository from "@modules/users/repositories/IUsers.repository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/Users.repository";

import ITaskRepository from "@modules/tasks/repositories/ITask.repository";
import TaskRepository from "@modules/tasks/infra/typeorm/repositories/Tasks.repository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITaskRepository>("TaskRepository", TaskRepository);
