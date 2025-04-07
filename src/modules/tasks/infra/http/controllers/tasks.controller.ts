import { Request, Response } from "express";
import { container } from "tsyringe";

import TasksService from "../services/tasks.service";

class TasksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description, priority, completed, dueDate } = req.body;

    const createUser = container.resolve(TasksService);

    const task = await createUser.execute({
      title,
      description,
      priority,
      completed,
      dueDate
    });

    return res.status(200).json(task);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page, per_page, search } = req.params;

    const listAllUsers = container.resolve(TasksService);

    const users = await listAllUsers.list({ page, per_page, search });

    return res.status(200).json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = container.resolve(TasksService);

    const user = await showUser.show(id);

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { title, description, priority, completed, dueDate } = req.body;

    const updateTask = container.resolve(TasksService);

    const task = await updateTask.update(
      id,
      title,
      description,
      dueDate,
      priority,
      completed
    );

    return res.status(200).json(task);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletedTask = container.resolve(TasksService);

    const user = await deletedTask.delete(id);

    return res.json({ message: "Post deleted successfully." });
  }
}

export default TasksController;
